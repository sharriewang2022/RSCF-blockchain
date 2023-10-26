import React, {Component} from 'react'
// import { declare } from "@babel/helper-plugin-utils";
// declare module '@babel/helper-plugin-utils';
import { Card, Row, Col, Container, Form, Button} from 'react-bootstrap';
import {AddProductToDataBase} from "../../api/productApi";
// import { ProductType} from "../../util/variableTypes";
import {blockContext} from "../../contexts/blockContext";
import '../../../src/App.css';

interface productProps {
}

interface productState {
  productId: string,
  productName: string,
  price: number,
  amount: number,
  productItem: string
  blockchainHash: string
  category: string
  manufacturer: string
  supplier: string
  specific:string
  // createDate: Date
}

export class ProductView extends Component<productProps, productState> {
  static contextType = blockContext;
  declare context: React.ContextType<typeof blockContext>;  

  constructor(props: productProps) {
    super(props);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeProductItem = this.onChangeProductItem.bind(this);
    this.onChangeBlockchainHash = this.onChangeBlockchainHash.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeManufacturer = this.onChangeManufacturer.bind(this);
    this.onChangeSupplier = this.onChangeSupplier.bind(this);
    this.onChangeSpecific = this.onChangeSpecific.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      productId:"",
      productName: "",
      price: 0,
      amount: 0,
      productItem: "",
      blockchainHash: "",
      category: "",
      manufacturer: "",
      supplier: "",
      specific:"",
    };    
  }

  onChangeProductName(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      productName: e.target.value,
    });
  }

  onChangePrice(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      price: Number(e.target.value),
    });
  }

  onChangeAmount(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      amount: Number(e.target.value),
    });
  }

  onChangeProductItem(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      productItem: e.target.value,
    });
  }

  onChangeBlockchainHash(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      blockchainHash: e.target.value,
    });
  }

  onChangeCategory(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      category: e.target.value,
    });
  }

  onChangeManufacturer(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      manufacturer: e.target.value,
    });
  }

  onChangeSupplier(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      supplier: e.target.value,
    });
  }

  onChangeSpecific(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      specific: e.target.value,
    });
  }

  handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    const product = {       
      productId: this.state.productId,
      productName: this.state.productName,
      //Number() 、parseInt()、 parseFloat()
      price: Number(this.state.price),
      amount: Number(this.state.amount),
      productItem: this.state.productItem,
      blockchainHash: this.state.blockchainHash,
      category: this.state.category,   
      manufacturer: this.state.manufacturer,
      supplier: this.state.supplier,         
      specs: this.state.specific,
      current: 0,
      size: 0,
    };
    AddProductToDataBase(product);
    this.context.addProduct(product.productName);
  }

  render() {return (
    <div className="App-header">
    <div>
      <h1>Product</h1>
      <Form onSubmit={this.handleSubmit} id="productForm" >
          <Form.Group className="mb-3" controlId="formProductName" >  
              <Form.Label>ProductName: </Form.Label>
              <Form.Control type="text" placeholder="product name" required
                value={this.state.productName}
                onChange={this.onChangeProductName}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId=" formPrice"> 
              <Form.Label>Price: </Form.Label>
              <Form.Control type="number" placeholder="" required
                value={this.state.price}
                onChange={this.onChangePrice}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAmount"> 
               <Form.Label>Amount: </Form.Label>
               <Form.Control type="number" placeholder="" required
                value={this.state.amount}
                onChange={this.onChangeAmount}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductItem"> 
               <Form.Label>Product Item: </Form.Label>
               <Form.Control type="text" placeholder="" required
                value={this.state.productItem}
                onChange={this.onChangeProductItem}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategory"> 
               <Form.Label>Category: </Form.Label>
               <Form.Control type="text" placeholder="" required
                value={this.state.category}
                onChange={this.onChangeCategory}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formManufacturer"> 
               <Form.Label>Manufacturer: </Form.Label>
               <Form.Control type="text" placeholder="" required
                value={this.state.manufacturer}
                onChange={this.onChangeManufacturer}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSupplier"> 
               <Form.Label>Supplier: </Form.Label>
               <Form.Control type="text" placeholder="" required
                value={this.state.supplier}
                onChange={this.onChangeSupplier}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSpecific"> 
               <Form.Label>Discription: </Form.Label>
               <Form.Control type="text" placeholder="" required
                value={this.state.specific}
                onChange={this.onChangeSpecific}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBlockchainHash"> 
               <Form.Label>Blockchain Hash: </Form.Label>
               <Form.Control type="text" placeholder="" required
                value={this.state.blockchainHash}
                onChange={this.onChangeBlockchainHash}
              />
          </Form.Group>
          <Button variant="success" type="submit" form="productForm">
              Add Product
          </Button>         
      </Form>
  </div>
      </div>
    );
  }
}

export default ProductView;
