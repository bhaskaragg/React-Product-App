import React, { Component} from 'react';
// import { Table} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

class Products extends Component {

    constructor(props){
      super(props);
      this.state={
        routeTo : false
      }
    }

    render(){
      const styles = {
    floatingActionButton: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    editButton: { 
      fill: grey[500]
    },
    columns: {
      id: {
        width: '10%'
      },
      name: {
        width: '40%'
      },
      weight: {
        width: '20%'
      },
      availability: {
        width: '20%'
      },
      edit: {
        width: '10%'
      }
    }
  };
    
    return (
                
                  <div className="animated fadeIn">
                   <div className="col-12 mb-5">
                      <h2 style={{textAlign:'center',backgroundColor : '#1976d2',
                                  color:'white',padding:10}}>Products List</h2>
                   </div>
                 <Paper spacing={3} style={{ padding: 15, marginRight: 30, marginLeft: 30}}>
      <Table style={{minWidth:'650'}}>
        <TableHead>
          <TableRow>
              <TableCell style={styles.columns.id}>ID</TableCell>            
              <TableCell style={styles.columns.name}>Name</TableCell>            
              <TableCell style={styles.columns.weight}>Weight</TableCell>            
              <TableCell style={styles.columns.availability}>Availability</TableCell>            
              <TableCell style={styles.columns.edit}>Edit</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.products.map((item,index) => {
            return(
            <TableRow key={index}>
              <TableCell style={styles.columns.id}>{index+1}</TableCell>            
              <TableCell style={styles.columns.name}>{item.name}</TableCell>            
              <TableCell style={styles.columns.weight}>{item.weight}gm</TableCell>            
              <TableCell style={styles.columns.availability}>{item.availability}</TableCell>            
              <TableCell style={styles.columns.edit}>
               <Fab      id={index}       aria-label="edit"
                                backgroundColor={grey[200]} disabled={!item.isEditable} onClick={this.props.handleClick}>
                                <EditIcon />  
              </Fab>
              </TableCell>
            </TableRow>
            )
          })

        }
        </TableBody>
      </Table>
      </Paper>
      </div>
    );
  }
  }

export default Products;
