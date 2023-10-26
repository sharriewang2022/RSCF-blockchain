import React, { useState }from 'react'
// import { declare } from "@babel/helper-plugin-utils";
// declare module '@babel/helper-plugin-utils';
import { Card, Row, Col, Container, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AddProductToDataBase} from "../../api/productApi";
import { ProductType} from "../../util/variableTypes";
import {useBlock} from "../../contexts/blockContext";
import '../../../src/App.css';

function ProductView () {
  const {addProduct,productCount,updateLocation} = useBlock();

  const [formData, setFormData] = useState<ProductType>({
    productId: '',
    productName: '',
    price: 0,
    amount: 0,
    productItems: '',
    blockchainHash: '',
    category: '',
    manufacturer: '',
    supplier: '',
    specific:'',
    // createDate: Date
  })

  const [ errors, setErrors ] = useState([])

  function handleFormChange(e:React.ChangeEvent<HTMLInputElement>) {
      const key = e.target.name;
      const value = e.target.value;
      //get value from user's input
      setFormData({...formData, [key]: value})
  }

  function handleFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();  
    if(formData.productName){
      addProduct(formData.productName);
    }  
    AddProductToDataBase(formData);     
  }

  return (
    <div className="App-header">
    <div>
      <h1>Product</h1>
      <div className="form-inline">
    <div className="col-md-12 form-group">
         <label className="col-sm-2 col-form-label"  >Name</label>
         <input type="text" className="form-control" name="name" id="name" disabled/>
    </div>
</div>
      <Form onSubmit={ handleFormSubmit} id="productForm" >
          <Form.Group className="form-inline mb-3" controlId="formProductName" >  
              <Form.Label class="col-sm-2 col-form-label">ProductName: </Form.Label>
              <Form.Control name="productName" type="text" placeholder="product name" required
                value={formData.productName}
                onChange={handleFormChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId=" formPrice"> 
              <Form.Label>Price: </Form.Label>
              <Form.Control id="price" name="price" type="number" placeholder="" required
                value={formData.price}
                onChange={handleFormChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAmount"> 
               <Form.Label>Amount: </Form.Label>
               <Form.Control name="amount" type="number" placeholder="" required
                value={formData.amount}
                onChange={handleFormChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductItem"> 
               <Form.Label>Product Item: </Form.Label>
               <Form.Control name="productItems" type="text" placeholder="" required
                value={formData.productItems}
                onChange={handleFormChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategory"> 
               <Form.Label>Category: </Form.Label>
               <Form.Control name="category" type="text" placeholder="" required
                value={formData.category}
                onChange={handleFormChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formManufacturer"> 
               <Form.Label>Manufacturer: </Form.Label>
               <Form.Control name="manufacturer" type="text" placeholder="" required
                value={formData.manufacturer}
                onChange={handleFormChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSupplier"> 
               <Form.Label>Supplier: </Form.Label>
               <Form.Control name="supplier" type="text" placeholder="" required
                value={formData.supplier}
                onChange={handleFormChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSpecific"> 
               <Form.Label>Discription: </Form.Label>
               <Form.Control name="specific" type="text" placeholder="" required
                value={formData.specific}
                onChange={handleFormChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBlockchainHash"> 
               <Form.Label>Blockchain Hash: </Form.Label>
               {/* <Form.Control name="blockchainHash" type="text" placeholder="" required
                value={formData.blockchainHash}
                onChange={handleFormChange}
              /> */}
              <Form.Control  name="blockchainHash" type="text" placeholder="" 
                value={formData.blockchainHash}
                onChange={handleFormChange}              
              />
              {errors.length > 0 ? <div className="error-container">{errors.map(error => <p className="error" key={error}>{error}</p>)}</div> : <div></div>}
          </Form.Group>
          <Button variant="success" type="submit" form="productForm">
              Add Product
          </Button>         
      </Form>
  </div>
      </div>
    );
}

export default ProductView;
