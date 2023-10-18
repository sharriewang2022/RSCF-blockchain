import React, {Component} from 'react'
import {AddProductToDataBase} from "../../api/productApi";
import { ProductType} from "../../util/variableTypes";

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
    this.onSubmit = this.onSubmit.bind(this);

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

  onSubmit(e:React.FormEvent<HTMLFormElement>) {
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
  }

  render() {
    return (
      <div>
        <h3>Create New Product</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>ProductName: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.productName}
              onChange={this.onChangeProductName}
            />
          </div>          
          <div className="form-group">
            <label>Price: </label>
            <input
              type="number"
              required
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>
          <div className="form-group">
            <label>Amount: </label>
            <input
              type="number"
              required
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
            />
          </div>
          <div className="form-group">
            <label>Product Item: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.productItem}
              onChange={this.onChangeProductItem}
            />
          </div>
          <div className="form-group">
            <label>Blockchain Hash: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.blockchainHash}
              onChange={this.onChangeBlockchainHash}
            />
          </div>
          <div className="form-group">
            <label>Category: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.category}
              onChange={this.onChangeCategory}
            />
          </div>
          <div className="form-group">
            <label>Manufacturer: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.manufacturer}
              onChange={this.onChangeManufacturer}
            />
          </div>
          <div className="form-group">
            <label>Supplier: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.supplier}
              onChange={this.onChangeSupplier}
            />
          </div>
          <div className="form-group">
            <label>Discriptiion: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.specific}
              onChange={this.onChangeSpecific}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add Product"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ProductView;
