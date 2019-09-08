import React, { Component} from 'react';
import { Table} from 'reactstrap';
class Products extends Component {

    constructor(props){
      super(props);
      this.state={
        routeTo : false
      }
    }

    render(){
    const productsList = this.props.products.map((data,index)=>{
      return (
                //For this scenario index as key will work
                <tr key={index}> 
                    <td>{index+1}</td>
                    <td>{data.name}</td>
                    <td className="text-center">{data.weight}gm</td>
                    <td className="text-center">{data.availability}</td>
                    <td className="text-center">
                    <button id ={index} disabled={!data.isEditable} onClick={this.props.handleClick}>Edit</button></td>
        </tr>
      );
    });

    return (
                
                  <div className="animated fadeIn">
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>       
                    <th>#</th>
                    <th>Name</th>
                    <th className="text-center">Weight</th>
                    <th className="text-center">Availability</th>
                    <th className="text-center">IsEditable</th>
                  </tr>
                  </thead>
                  <tbody>
                 {productsList}
                  </tbody>
                </Table>
      </div>
    );
  }
  }

export default Products;
