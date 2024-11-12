import React, { useEffect, useState } from "react";
import './AdminAssignTaskComponen.css'
import axios from "axios";
import { useSelector } from "react-redux";

const AdminAssignTaskComponent = () => {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/user/Getadminassigntask/${user._id}`
            );
            if (response.data.success === false || !response.data.adminAssignedTasks.length) {
                setData([]); // Set data to empty if there's no success or tasks
            } else {
                setData(response.data.adminAssignedTasks);
            }
        } catch (error) {
            setData([]); // Set data to empty in case of error
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="AdminAssignTaskComponent">
            <h2>Assigned Tasks</h2>
            <div className="listproduct-format-mainkk">
                <p>No</p>
                <p>Task</p>
                <p>Assigned At</p>
            </div>
            <div className="listproduct-allproductsk">
                <hr />
                {data.length === 0 ? (
                    <h3>No tasks assigned.</h3>
                ) : (
                    data[0]?.tasks.map((ele, index) => (
                        <React.Fragment key={ele._id}>
                            <div className="listproduct-format-mainkk listproduct-formatk">
                                <p>{index + 1}</p>
                                <p>{ele.task}</p>
                                <p>{formatDate(ele.date)}</p>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminAssignTaskComponent;
