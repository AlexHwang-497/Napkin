import React from 'react'
import {useState} from 'react'

import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Paper,
    CardMedia,
    ImageListItem
} from '@material-ui/core'

const subscribarList = [
    {
        name: 'john doe',
        date: '18 january, 2019',
        amount: 1000,
        status: 'close',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'james cassegne',
        date: '8 january, 2019',
        amount: 5000,
        status: 'close',
        company: 'Collboy Tech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
]

const PaginationTable = ({post}) => {
    // console.log('this is the post in PaginationTable',post)
    // console.log('this is the post.post in PaginationTable',post.post)
    // console.log('this is the post.post.assets in PaginationTable',post.post.assets)
    // const [assets, setAssets] = useState(post.post.assets || [])
    // const [ownership, setOwnership] = useState(post.post.ownership || [])
    // const [sector, setSector] = useState(post.post.sector || [])
    // const [image, setImage] = useState(post.post.image || [])
    
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    // const deleteEntry =(index) =>{
    //     setAssets(assets.filter((asset,i)=>i!==index))
    //     setOwnership(ownership.filter((o,i)=>i!==index))
    //     setSector(sector.filter((s,i)=>i!==index))
    //     setImage(image.filter((img,i)=>i!==index))
        
        
    // }

    return (
        <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0"></TableCell>
                        <TableCell className="px-0">Symbol</TableCell>
                        <TableCell className="px-0">Sector</TableCell>
                        <TableCell className="px-0">Portfolio(%)</TableCell>
                        <TableCell className="px-0">Portfolio($)</TableCell>

                        <TableCell className="px-0">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
              
                        
                        {post.assets && post.assets.map((asset,i)=>(
                            <TableRow key={i}>

                                    <TableCell>
                                        
                                            <img src={post.image[i]} style={{height:'30px',width:'30px'}}/>
                                        
                                    </TableCell>
                                    <TableCell className="px-0 capitalize" align="left">{asset}</TableCell>
                                    <TableCell className="px-0 capitalize" align="left">{post.sector[i]}</TableCell>
                                    <TableCell className="px-0 capitalize" align="left">{post.ownership[i]}%</TableCell>
                                    <TableCell className="px-0 capitalize" align="left">${post.ownership[i]*100}</TableCell>
                                    <TableCell className="px-0"> <IconButton onClick={()=>post.deleteEntry(i)}> <Icon color="error">X</Icon> </IconButton> </TableCell>      
                            </TableRow>
                        ))}
                        
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={subscribarList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default PaginationTable
