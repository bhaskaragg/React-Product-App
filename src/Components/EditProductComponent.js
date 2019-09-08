import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
    
class EditProduct extends Component {
    constructor(props){
        super(props);
         this.state = {
            name: '',
            weight: '',
            availability: null,
            productUrl: '',
            isEditable: false,
            priceTier: 'budget',
            priceRange: '4k-6k',
             touched: {
                 name: false,
                 weight: false,
                 productUrl: false,
             },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isSubmitEnable = this.isSubmitEnable.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    validate(name, weight, productUrl) {

        const errors = {
            name: '',
            weight: '',
            productUrl: '',
        };

        if (this.state.touched.name && !name.length)
            errors.name = 'Name cannot be empty';
        
        if (this.state.touched.weight && !weight.length)
            errors.weight = 'Weight cannot be empty';

        if (this.state.touched.productUrl && !productUrl.length)
            errors.productUrl = 'Product URL cannot be empty';
        
        return errors;
    }
    
    
    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox'? target.checked : target.value;
        if(target.type === 'radio'){
            target.type === 'budget'?this.setState({
                priceRange: '4k-6k'
            }): this.setState({
                priceRange: '11k-20k'
            });
        }
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var editItem = {
            name: this.state.name,
            pricingTier: this.state.priceTier,
            priceRange: this.state.priceRange,
            weight: this.state.weight, // In grams
            availability: this.state.availability,
            productUrl: this.state.productUrl,
            isEditable: this.state.isEditable
        }
        var itemIndex = this.props.itemIndex;
        var response = {
            editItem : editItem,
            itemIndex : itemIndex
        }
        this.props.editUpdatedProduct(response);
    }

    isSubmitEnable() {
        if(this.state.name && this.state.weight && this.state.productUrl) {
           return true;
        }
        return false;
    }
    render(){
        const errors = this.validate(this.state.name, this.state.weight, this.state.productUrl);  
        const enabled = this.isSubmitEnable();  
        return(
        <div className="row row-content">
                   <div className="col-12 mb-5">
                      <h3 style={{textAlign:'center'}}>Edit The Item</h3>
                   </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="name" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="name" name="name"
                                        placeholder="Name"
                                        value={this.state.name}
                                        invalid={errors.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="weight" md={2}>Weight</Label>
                                <Col md={10}>
                                    <Input type="text" id="weight" name="weight"
                                        placeholder="Weight"
                                        value={this.state.weight}
                                        invalid={errors.weight !== ''}
                                        onBlur={this.handleBlur('weight')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.weight}</FormFeedback>
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                            <Label htmlFor="availability" md={2}>Availability</Label>
                                <Col md={10}>
                                    <Input type="number" id="availability" name="availability"
                                        placeholder="Availability"
                                        value={this.state.availability}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="productUrl" md={2}>Product URL</Label>
                                <Col md={10}>
                                    <Input type="productUrl" id="productUrl" name="productUrl"
                                        placeholder="Product Url"
                                        value={this.state.productUrl}
                                        invalid={errors.productUrl !== ''}
                                        onBlur={this.handleBlur('productUrl')}
                                        onChange={this.handleInputChange} />
                                </Col>
                                <FormFeedback>{errors.productUrl}</FormFeedback>
                            </FormGroup>
                            <FormGroup row>
                            <Col md={{ size: 1, offset: 2 }}>
                                        <Label>
                                            <Input type="radio"
                                                name="priceTier"
                                                checked={this.state.priceTier === 'budget'}
                                                value="budget"
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>Budget</strong>
                                        </Label>
                            </Col>
                            <Col md={{ size: 1 }}>
                                            <Label>
                                                <Input type="radio"
                                                    name="priceTier"
                                                    checked={this.state.priceTier === 'premier'}
                                                    value="premier"
                                                    onChange={this.handleInputChange} /> {' '}
                                                <strong>Premier</strong>
                                            </Label>
                                </Col>
                            {this.state.priceTier==='budget'?
                                <Col md={{size: 3,offset: 4}}>
                                    <Input type="select" name="priceRange"
                                            value={this.state.priceRange}
                                            onChange={this.handleInputChange}>
                                        <option>4k-6k</option>
                                        <option>6k-9k</option>
                                        <option>9k-11k</option>
                                    </Input>
                                </Col> :
                                <Col md={{size: 3, offset: 4}}>
                                    <Input type="select" name="priceRange"
                                            value={this.state.priceRange}
                                            onChange={this.handleInputChange}>
                                        <option>11k-20k</option>
                                        <option>20k-30k</option>
                                        <option>30k+</option>
                                    </Input>
                                </Col>
                            }
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 5, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="isEditable"
                                                checked={this.state.isEditable}
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>Is it Editable</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 8, offset: 4}}>
                                    <Button type="submit" disabled={!enabled} className="btn btn-success"   >
                                        Submit
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
               </div>
        );
    }
}
export default EditProduct;
