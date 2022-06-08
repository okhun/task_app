import { Input, message, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { headers, url } from '../../config'
import { useNavigate } from 'react-router-dom'

const Product = () =>
{
    let navigate = useNavigate();
    let filteredUsers: any
    const [items, setItems] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [loadSpin, setLoadSpin] = useState(true);
    const [searchValue, setSearchValue] = useState('')
    useEffect(() =>
    {
        getProducts()
    }, [])

    const getProducts = async () =>
    {
        const token = localStorage.getItem("token")
        if (!token)
        {
            navigate('/login')
        } else
        {
             try
        {
            const res = await axios.get(
                url + 'variations',
                headers(token),
            )
            if (res.status === 200)
            {
                setItems(res.data.items)
                setFilterItems(res.data.items)
                setLoadSpin(false)
            }
        } catch (e: any)
             {
                 localStorage.clear()
            message.error(`${e?.response?.data?.message}`)
                 setLoadSpin(false)
                 navigate('/login')
        }
        }
       
    }
    filteredUsers = useMemo(() =>
    {
        if (searchValue)
        {
           return filterItems.filter(
            (entry: any) =>
                entry?.productName
                    .toLowerCase()
                    .search(new RegExp(searchValue.toLowerCase())) !== -1
        ).sort((a:any, b:any) => {
        // Sort results by matching name with keyword position in name
        if(a.productName.toLowerCase().indexOf(searchValue.toLowerCase()) > b.productName.toLowerCase().indexOf(searchValue.toLowerCase())) {
            return 1;
        } else if (a.productName.toLowerCase().indexOf(searchValue.toLowerCase()) < b.productName.toLowerCase().indexOf(searchValue.toLowerCase())) {
            return -1;
        } else {
            if(a.productName > b.productName)
                return 1;
            else
                return -1;
        }
    }) 
        } else
        {
            return filterItems;
        }
        
    }, [searchValue])
    useEffect(() =>
    {
        setItems(filteredUsers)
    }, [filteredUsers])
    return <div style={{ margin: "10px 40px 10px 40px" }}>
        <Input
            placeholder="Search Product"
            value={searchValue}
            size={'middle'}
            style={{
                width: '200px',
                marginRight: '8px',
                marginTop: "40px",
                marginBottom: "40px"
            }}
            onChange={(e:any) =>
            {
                setSearchValue(e.target.value)
            }}
        />
        <Table loading={loadSpin}
            dataSource={items}
            rowKey={(item: any) =>
            {
                return item.barcode
            }}
        >
            <Column title="SUPPLIER" dataIndex="supplier" key="supplier" />
            <Column title="NAME" dataIndex="name" key="name" />
            <Column
                title="PRODUCT NAME"
                dataIndex="productName"
                key="productName"
            />
            <Column
                title="DESCRIPTION"
                dataIndex="shortDescription"
                key="shortDescription"
            />
            <Column
                title="UNITS"
                dataIndex="unit"
                key="unit"
            />
            <Column
                align="right"
                title="SKU"
                dataIndex="sku"
                key="sku"
            />
        </Table>
    </div>
}

export default Product;