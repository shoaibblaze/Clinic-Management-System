import axios from 'axios'
import React, { useDebugValue, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { showLoading,hideLoading } from '../../redux/alertsSlice'
import { Table } from "antd";
import moment from 'moment'

function Userlist() {
    const[users,setUsers] =useState([])
    const dispatch =useDispatch()
    const getUsersData= async() =>{
        try{
            dispatch(showLoading())
            const resposne =await axios.get('/api/admin/get-all-users',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                });
                dispatch(hideLoading());
                if (resposne.data.success) {
                  setUsers(resposne.data.data);
                }
              } catch (error) {
                dispatch(hideLoading());
              }
            };
     
    useEffect(() => {
     getUsersData()
    }, [])
    
  const columns =[
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <h1 className="anchor">Block</h1>
        </div>
      ),
    },
  ]
  return (
    <Layout>
         <h1 className='page-header'>Users list</h1>
         <Table columns={columns} dataSource={users}/>
    </Layout>
   
  )
}

export default Userlist