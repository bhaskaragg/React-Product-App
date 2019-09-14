import React,{Component} from 'react';
import { Form, Label, Input, Col, FormFeedback } from 'reactstrap';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';  
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
            target.value === 'budget'?this.setState({
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
        <div className="row row-content" style={{width:'100%',padding:'0'}}>
                   <div className="col-12">
                      <h2 style={{textAlign:'center',backgroundColor : '#1abc9c',
                                  color:'white',padding:20, marginRight:50, marginLeft:50,marginTop:20,marginBottom:30}}>Edit The Item</h2>
                   </div>
                    <div className="col-12 mt-10">
                        <Form onSubmit={this.handleSubmit}>
                           
                 <Paper style={{ padding: 30, marginRight: 50, marginLeft: 50}}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    error={errors.name !== ''}
                    onBlur={this.handleBlur('name')}
                    onChange={this.handleInputChange}
                    helperText={errors.name}
                    name="name"
                    type="text"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    error={errors.weight !== ''}
                    onBlur={this.handleBlur('weight')}
                    onChange={this.handleInputChange}
                    helperText={errors.weight}
                    name="weight"
                    type="text"
                    label="Weight"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    onChange={this.handleInputChange}
                    name="availability"
                    type="number"
                    label ="Availability"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    error={errors.productUrl !== ''}
                    onBlur={this.handleBlur('productUrl')}
                    onChange={this.handleInputChange}
                    helperText={errors.productUrl}
                    name="productUrl"
                    type="productUrl"
                    label="ProductUrl"
                  />
                </Grid>
                <Grid item spacing={5}>
                <RadioGroup row>
                    <Label>
                        <Radio type="radio"
                            name="priceTier"
                            checked={this.state.priceTier === 'premier'}
                            value="premier"
                            onChange={this.handleInputChange} /> {' '}
                        <strong>Premier</strong>
                    </Label>
                    <Label>
                        <Radio type="radio"
                            name="priceTier"
                            checked={this.state.priceTier === 'budget'}
                            value = "budget"
                            onChange={this.handleInputChange} /> {' '}
                        <strong>Budget</strong>
                    </Label>
                </RadioGroup>
                </Grid>
                {this.state.priceTier==='budget'?
                <Grid item xs={9} style={{margin:'0 0 0 40px'}}>
                  <Select style={{textAlign:'center'}}
                    fullWidth
                    name="priceRange"
                    label="Select Price Range"
                    formControlProps={{ fullWidth: true }}
                    value={this.state.priceRange}
                    onChange={this.handleInputChange}>
                    <MenuItem value="4k-6k">4k-6k</MenuItem>
                    <MenuItem value="6k-9k">6k-9k</MenuItem>
                    <MenuItem value="9k-11k">9k-11k</MenuItem>
                  </Select>
                </Grid> :
                <Grid item xs={9} style={{margin:'0 0 0 40px'}}>
                  <Select style={{textAlign:'center'}}
                    fullWidth
                    name="priceRange"
                    label="Select Price Range"
                    formControlProps={{ fullWidth: true }}
                    value={this.state.priceRange}
                    onChange={this.handleInputChange}>
                    <MenuItem value="11k-20k">11k-20k</MenuItem>
                    <MenuItem value="20k-30k">20k-30k</MenuItem>
                    <MenuItem value="30k+">30k+</MenuItem>
                  </Select>
                </Grid>
                }
                <Grid item  spacing={3} style={{marginLeft:'10px'}}>
                <FormGroup check>
                                        <FormControlLabel label="Is is Editable"
                                            control = {
                                            <Checkbox type="checkbox"
                                                name="isEditable"
                                                checked={this.state.isEditable}
                                                onChange={this.handleInputChange} />
                                            }
                                        /> 
                                    </FormGroup>
                </Grid>
                <Grid item xs={12} style={{ marginLeft:'550px' }}>
                  <Link to="/">
                       <Button
                    variant="contained"
                    color = "primary" > Cancel </Button>
                    </Link>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!enabled} style={{ marginLeft:'50px' }}> Save </Button>
                </Grid>
                </Grid>
                </Paper>
                 </Form>
                </div>
                </div>
        );
    }
}
export default EditProduct;
