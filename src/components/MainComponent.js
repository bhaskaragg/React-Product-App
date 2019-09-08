import React, {Component} from 'react';
import Products from './ProductsComponent';
import EditProduct from './EditProductComponent';
import {Switch, Route, Redirect,withRouter} from 'react-router-dom';   
import { connect } from 'react-redux';
import { editSelectedProduct, setItemIndex} from '../redux/action';

const mapStateToProps = state => {
    return {
         products : state.products,
         itemIndex : state.itemIndex
    }
}

const mapDispatchToProps = dispatch => ({
    editSelectedProduct: (response) => {dispatch(editSelectedProduct(response))},
    setItemIndex : (itemIndex) => {dispatch(setItemIndex(itemIndex))}
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.editUpdatedProduct = this.editUpdatedProduct.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.setItemIndex(e.target.id);
        this.props.history.push('/edit-product');
    }

    editUpdatedProduct(response) {
        this.props.editSelectedProduct(response);
        console.log(this.props);
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <Switch>
                <Route exact path="/" component = {()=> <Products handleClick= {this.handleClick} products = {this.props.products} />}/>
                <Route path= "/edit-product"  component = {() => <EditProduct itemIndex ={this.props.itemIndex} products = {this.props.products} editUpdatedProduct={this.editUpdatedProduct} />}/>
                <Redirect to = "/" />
                </Switch>
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
