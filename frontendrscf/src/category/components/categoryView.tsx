import React, {Component} from 'react'
import {getCategoryList, AddCategoryToDataBase} from "../../api/categoryApi";
import { CategoryType} from "../../util/variableTypes";

interface categoryProps {
}

interface categoryState {
  categoryId: string,
  categoryName: string,
  parentId: string,
  parentName: string,
  manufacturer: string,
  supplier: string,
  specific:string,
  selectOptions: CategoryType[],
  selectedItems: [],
  // createDate: Date
}

export class CategoryView extends Component<categoryProps, categoryState> {
  constructor(props: categoryProps) {
    super(props);
    this.onChangeCategoryName = this.onChangeCategoryName.bind(this); 
    this.onChangeParentName = this.onChangeParentName.bind(this);   
    this.onChangeManufacturer = this.onChangeManufacturer.bind(this);
    this.onChangeSupplier = this.onChangeSupplier.bind(this);
    this.onChangeSpecific = this.onChangeSpecific.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      categoryId:"",
      categoryName: "",
      parentId: "",
      parentName: "",
      manufacturer: "",
      supplier: "",
      specific:"",
      selectOptions:[],
      selectedItems:[],
    };
  }

  onChangeCategoryName(e:React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      categoryName: e.target.value,
    });
  }

  onChangeParentName(e:React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      parentName: e.target.value,
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


  componentDidMount(): void {
    setTimeout(async () => {
      let allCategorys= await getCategoryList();
      this.setState({
        selectOptions: allCategorys
      })
    }
    )
  }


  async onSubmit(e:React.FormEvent<HTMLFormElement>) {
    const category = {       
      categoryId: this.state.categoryId,
      categoryName: this.state.categoryName,   
      parentId: this.state.parentId, 
      parentName: this.state.parentName,   
      manufacturer: this.state.manufacturer,
      supplier: this.state.supplier,         
      specs: this.state.specific,
      current: 0,
      size: 0,
    };    
    const message = await AddCategoryToDataBase(category);; 
    if(message){
      alert(message);
    }       
  }

  render() {
    const { parentName, selectOptions } = this.state;
    const filteredOptions = selectOptions.filter(o => !parentName.includes(o.categoryName));
    return (
      <div>
        <h3>Category</h3>
        <form className="row g-3" onSubmit={this.onSubmit}>
          <div className="col-md-6">
            <label htmlFor="inputCategoryName" className="form-label">Category Name: </label>
            <input type="text" className="form-control" id="inputCategoryName"
              required            
              value={this.state.categoryName}
              onChange={this.onChangeCategoryName}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputParentName" className="form-label">Parent Name: </label>
            <select id="inputParentName" className="form-select"              
              placeholder="Choose Parent Category"
              value={this.state.parentName}
              onChange={this.onChangeParentName}
              // onSelect={this.onChangeParentName} 
              >
              <option selected>Choose...</option>
              {/* {ROLES.map( (role , index)=>(
                      <MenuItem value={role} key = {index}>{role}</MenuItem>
                    ))} */}
              {this.state.selectOptions.map((item:CategoryType) => (                    
                      <Option>
                        {item.categoryName}
                      </Option>                  
              ))}
                {this.state.selectOptions.map(option=> (
    <Option value={option.categoryId}>{option.categoryName}</Option>
  ))}
            </select>
          </div>
          <div className="col-md-8">
            <label htmlFor="inputManufacturer" className="form-label">Manufacturer:</label>
            <input type="text" className="form-control" id="inputManufacturer" placeholder=""
              value={this.state.manufacturer}
              onChange={this.onChangeManufacturer}
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="inputSupplier" className="form-label">Supplier:</label>
            <input type="text" className="form-control" id="inputSupplier" placeholder=""
              value={this.state.supplier}
              onChange={this.onChangeSupplier}
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="inputSpecific" className="form-label">Discription:</label>
            <input type="text" className="form-control" id="inputSpecific"
               value={this.state.specific}
               onChange={this.onChangeSpecific}
            />
          </div>       
          {/* <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck"/>
              <label className="form-check-label" htmlFor="gridCheck">
                default 
              </label>
            </div>
          </div> */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary buttonMargin"            
                value="Add Category" >Add</button>
            <button className="btn btn-primary">List</button>
          </div>
        </form>  
      </div>
    );
  }
}

export default CategoryView;
