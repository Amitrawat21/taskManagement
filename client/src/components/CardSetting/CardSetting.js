import React, { useState } from "react";
import "./CardSetting.css";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteCard from "../DeleteCard/DeleteCard";
import CardUpdate from "../CardUpdate/CardUpdate";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jsPDF from 'jspdf';

const CardSetting = ({ id, item, setActiveCardId }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);

  const deleteTask = () => {
    setShowDeleteCard(!showDeleteCard);
  };

  const editTask = () => {
    setShowEditCard(!showEditCard);
  };

  const openTask = () => {
    navigate(`/Card/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  const downloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const textWidth = pageWidth - 2 * margin;

    doc.setFontSize(20);
    doc.text('User Detail', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Username: ${user.name}`, margin, 40);
    doc.text(`Email: ${user.email}`, margin, 50);

    doc.setFontSize(20);
    doc.text('Task Details', pageWidth / 2, 70, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Title: ${item.title}`, margin, 90, { align: 'left' });

    const description = `Description: ${item.description}`;
    const splitDescription = doc.splitTextToSize(description, textWidth);
    doc.text(splitDescription, margin, 100);

    doc.text(`Priority: ${item.priority}`, margin, 120);
    doc.text(`Status: ${item.status}`, margin, 130);
    doc.text(`Created At: ${formatDate(item.createdAt)}`, margin, 140);
    doc.text(`Submit Date: ${formatDate(item.submitDate)}`, margin, 150);

    // Save the PDF
    doc.save('task.pdf');
  };



  return (
    <div className="cardSetting_container">
      <div className="cardSetting-wrapper">
        <div className="cardSetting-input" onClick={openTask}>
          <FileOpenIcon className="FileOpenIcon" />
          <h4>Open Task</h4>
        </div>
        <div className="cardSetting-input" onClick={editTask}>
          <ModeEditIcon  className="FileOpenIcon"  />
          <h4>Edit</h4>
        </div>
        <div className="cardSetting-input" onClick={deleteTask}>
          <DeleteIcon  className="FileOpenIcon"  />
          <h4>Delete</h4>
        </div>
        <div className="cardSetting-input" onClick={downloadPDF}>
          <PictureAsPdfIcon  className="FileOpenIcon"  />
          <h4>Download PDF</h4>
        </div>
      </div>
      {showDeleteCard && (
        <div className="deleteCard">
          <DeleteCard id={id} setShowDeleteCard={setShowDeleteCard} setActiveCardId={setActiveCardId} />
        </div>
      )}
      {showEditCard && (
        <div className="cardUpdate">
          <CardUpdate
            setShowEditCard={setShowEditCard}
            item={item}
            setActiveCardId={setActiveCardId}
          />
        </div>
      )}
    </div>
  );
};

export default CardSetting;
