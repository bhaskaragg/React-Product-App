import React, {Component} from 'react';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state={
      id: -1
    }
    this.handleval = this.handleval.bind(this);
  }
  handleval(event,key) {
    const row=event.currentTarget;
    console.log(row,key);
    this.setState({
      id : key
    })
  }

  render() {
  const datas=[
    { id: 1, name: 'Test 1', age: 27, city: 'Pune', mark: 89, suggestions: [4, 5, 7] },
{ id: 2, name: 'Veer', age: 23, city: 'Surat', mark: 43, suggestions: [1, 3, 7] },
{ id: 3, name: 'Vikas', age: 21, city: 'Banglore', mark: 65, suggestions: [2, 6, 9] },
{ id: 4, name: 'Ravi', age: 27, city: 'Mumbai', mark: 50, suggestions: [1, 4, 8] },
{ id: 5, name: 'Sachin', age: 23, city: 'Chennai', mark: 44, suggestions: [3, 11, 4] },
{ id: 6, name: 'Vidrohi', age: 29, city: 'Vadodara', mark: 72, suggestions: [12, 10, 3] },
{ id: 7, name: 'Ashish', age: 27, city: 'Pune', mark: 89, suggestions: [1, 9, 12] },
{ id: 8, name: 'Amir', age: 23, city: 'Surat', mark: 43, suggestions: [11, 12, 8] },
{ id: 9, name: 'Ravi', age: 21, city: 'Banglore', mark: 65, suggestions: [8, 9, 10] },
{ id: 10, name: 'Sameer', age: 27, city: 'Mumbai', mark: 50, suggestions: [10, 6, 8] },
{ id: 11, name: 'Vikram', age: 23, city: 'Chennai', mark: 44, suggestions: [3, 2, 1] },
{ id: 12, name: 'Jit', age: 29, city: 'Vadodara', mark: 72, suggestions: [4, 5, 7] },
  ];
  const dataval = datas.map((data)=>{
    return (
      <tr key={data.id} onClick={(e)=>this.handleval(e,data.id)}>
        <td>{data.name}</td>
        <td>{data.age}</td>
        <td>{data.city}</td>
        </tr>
    )
  })
  const selectData = datas.map((data)=> {
    if(data.id==this.state.id){
      return(
      <tr>
        <td>{data.name}</td>
        <td>{data.age}</td>
        <td>{data.city}</td>
        <td onClick={(e)=>this.handleval(e,data.suggestions[0])}>{data.suggestions[0]}</td>
        <td onClick={(e)=>this.handleval(e,data.suggestions[1])}>{data.suggestions[1]}</td>
        <td onClick={(e)=>this.handleval(e,data.suggestions[2])}>{data.suggestions[2]}</td>
        </tr>
      );
    }
  })
  return (
   <div style={{display:'inline-block'}}>
    <table>
     <tr>
       <th>
         Name
        </th>
        <th>
         Age
        </th>
        <th>
         City
        </th>
      </tr>
      {dataval}
    </table>
    <br/>
        <br/>
        <br/>
    <div>
    {this.state.id!=-1?
    <table>
      {selectData}
      </table>
      :
      <span></span>
    }
    </div>  
    </div>

  );
}
}
export default App;
