import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ChuongTrinhKhuyenMai extends Component {
  constructor () {
    super()

    this.state = {
        chuongtrinh: [],
        nhomkhachhang: [],
        tenchuongtrinh:'',
        duocgiam:'',
        donvi: '',
        ngayapdung: '',
        denngay: '',
        nhomthanhvien: '',
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewChuongTrinh  = this.handleCreateNewChuongTrinh.bind(this)
    this.handleDeleteChuongTrinh  = this.handleDeleteChuongTrinh.bind(this)
    this.handleChiTietChuongTrinh  = this.handleChiTietChuongTrinh.bind(this)
    this.handleUpdateChuongTrinh = this.handleUpdateChuongTrinh.bind(this)


  }
  componentWillMount() {
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = true
    scripttag.appendChild(script);
  })
    axios.get('/index.php/api/chuongtrinh').then(response => {
        this.setState({
          chuongtrinh: response.data
        })
      })
      axios.get('/index.php/api/nhomkhachhang').then(response => {
        this.setState({
          nhomkhachhang: response.data
        })
      })
  }
  componentDidMount() {
    const scripts = [
        './public/app_assets/js/datatable/custom.js',
    ];
    const scripttag = document.getElementById("tagscripts");
    scripttag.innerHTML = '';
    scripts.forEach(s => {
      const script = document.createElement("script");
      script.type = 'text/javascript';
      script.src = s;
      script.async = true
      scripttag.appendChild(script);
    })
  }

  
  handleFieldChange (event) {
   

   var checkedArr = [];
   var value;
    if(event.target.type == 'checkbox')
    {
      
        const checkeds = document.getElementsByTagName('input');
        for (var i = 0; i < checkeds.length; i++) {
          if (checkeds[i].checked) {
            checkedArr.push(checkeds[i].value);
          }
        }
        value = checkedArr;
      this.setState({ [event.target.name]: value });
    }
    else if(event.target.type == 'file')
    {
    
      this.setState({
        [event.target.name]:event.target.files[0]
      })
    }
    else
    {
      this.setState({
        [event.target.name]: event.target.value
      })
      
    }
   
  }
  
  handleCreateNewChuongTrinh (event) {
    event.preventDefault()

    const { history } = this.props

    const chuongtrinh = {
      tenchuongtrinh: this.state.tenchuongtrinh,
      duocgiam: this.state.duocgiam,
      donvi: this.state.donvi,
      ngayapdung: document.getElementById("ngayapdung").value,
      denngay: document.getElementById("denngay").value,
      nhomthanhvien: this.state.nhomthanhvien,
    }
    console.log(chuongtrinh);
    axios.post('/index.php/api/chuongtrinh', chuongtrinh)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/chuongtrinh').then(response => {
            this.setState({
                chuongtrinh: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteChuongTrinh(event)
  {
      event.preventDefault()
      let idchuongtrinh=event.target.attributes.getNamedItem('data-idchuongtrinh').value

      axios.get('/index.php/api/chuongtrinhdelete/'+idchuongtrinh)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/chuongtrinh').then(response => {
            this.setState({
                chuongtrinh: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietChuongTrinh(event)
  {
    event.preventDefault()
    let idpc=event.target.attributes.getNamedItem('data-idchuongtrinh').value
    axios.get('/index.php/api/chuongtrinh/'+idpc)
      .then(response => {
        console.log(response.data)
        document.getElementById('updatetenchuongtrinh').value=response.data["tenchuongtrinh"]
        document.getElementById('updateduocgiam').value=response.data["duocgiam"]
        document.getElementById('updatedonvi').value=response.data["donvi"]
        document.getElementById('updatengayapdung').value=response.data["ngayapdung"]
        document.getElementById('updatedenngay').value=response.data["denngay"]
        document.getElementById('updatenhomthanhvien').value=response.data["nhomthanhvien"]
       
        var selectdv=document.getElementById("updatedonvi").childNodes;
        for(var i = 0; i < selectdv.length; i++) {
          var datadv=selectdv[i].value;
          if(datadv==response.data["donvi"])
          {
            selectdv[i].setAttribute('selected', true);
          }
         }
         var selectidcha=document.getElementById("updatenhomthanhvien").childNodes;
         for(var i = 0; i < selectidcha.length; i++) {
           var datagt=selectidcha[i].value;
           if(datagt==response.data["nhomthanhvien"])
           {
            selectidcha[i].setAttribute('selected', true);
           }
          }
         this.setState({
            tenchuongtrinh: response.data["tenchuongtrinh"],
            duocgiam: response.data["duocgiam"],
            donvi: response.data["donvi"],
            ngayapdung: response.data["ngayapdung"],
            denngay: response.data["denngay"],
            nhomthanhvien: response.data["nhomthanhvien"],
            updateid: response.data["id"]
        })
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleUpdateChuongTrinh(event)
  {
    event.preventDefault()
     const chuongtrinhupdate = {
        tenchuongtrinh: this.state.tenchuongtrinh,
            duocgiam: this.state.duocgiam,
            donvi: this.state.donvi,
            ngayapdung: document.getElementById("updatengayapdung").value,
            denngay: document.getElementById("denngay").value,
            nhomthanhvien: this.state.nhomthanhvien
      }
      console.log(chuongtrinhupdate);
      axios.post('/index.php/api/chuongtrinhupdate/'+this.state.updateid,chuongtrinhupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/chuongtrinh').then(response => {
            this.setState({
              chuongtrinh: response.data
            })
          })
          var button = document.getElementById('btn-ends')
          button.click()
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-ends')
        button.click()
      })
      
    
  }
  getTenNhom(idnhom,idchuongtrinh)
{
  axios.get('/index.php/api/tennhomkhachhang/'+idnhom).then(response => {
    document.getElementById("colnhomct"+idchuongtrinh).innerHTML = response.data
         
  })
}
render () {
const { chuongtrinh,nhomkhachhang } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Ch????ng tr??nh khuy???n m??i
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table color-table primary-table" >
          <thead>
            <tr>
              <th>T??? ng??y</th>
              <th>?????n ng??y</th>
              <th>T??n ch????ng tr??nh</th>
              <th>??p d???ng v???i</th>
              <th>???????c gi???m</th>
              <th>Tr???ng th??i</th>
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
          <tfoot>
            <tr>
            <th>T??? ng??y</th>
              <th>?????n ng??y</th>
              <th>T??n ch????ng tr??nh</th>
              <th>??p d???ng v???i</th>
              <th>???????c gi???m</th>
              <th>Tr???ng th??i</th>
            
              <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </tfoot>
          <tbody>
          {chuongtrinh.map(cd => ( 
            <tr id={"chuongtrinhitem"+cd.id} data-itemcd={cd.id}>
            
              <td data-icd={cd.id}>{cd.ngayapdung}</td>
              <td data-icd={cd.id}>{cd.denngay}</td>
              <td data-icd={cd.id}>{cd.tenchuongtrinh}</td>
              <td data-icd={cd.id} id={'colnhomct'+cd.id}>{this.getTenNhom(cd.nhomthanhvien,cd.id)}</td>
              <td data-icd={cd.id}>{cd.duocgiam+cd.donvi}</td>
             <td data-icd={cd.id}>??ang ch???y</td>
              
              <td className="btnaction"><button data-idchuongtrinh={cd.id} onClick={this.handleDeleteChuongTrinh} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}><i className="fa fa-trash-o" data-idchuongtrinh={cd.id}></i></button><button onClick={this.handleChiTietChuongTrinh} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idchuongtrinh={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idchuongtrinh={cd.id}></i></button></td>
             
            </tr>
          ))}
            
          </tbody>
        </table>
      </div>
    
  </div>
</div>
      </div>
    </div>
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">??</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">T???o Ch????ng Tr??nh Khuy???n M??i</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewChuongTrinh}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">T??n ch????ng tr??nh</label>
              <input type="text" className="form-control" name="tenchuongtrinh" id="tenchuongtrinh" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
                  <div className="row">
                      <div className="col-md-9">
                      <label htmlFor="recipient-name" className="control-label">???????c gi???m</label>
                      <input type="text" className="form-control" name="duocgiam" id="duocgiam" onChange={this.handleFieldChange} /> 
                      </div>
                      <div className="col-md-3">
                      <label htmlFor="recipient-name" className="control-label">????n v???</label>
                      <select className="form-control" name="donvi" id="donvi" onChange={this.handleFieldChange}>
                          <option value="ch??a ch???n">Ch???n ????n v???</option>
                        <option value="%">%</option>
                        <option value="VN??">VN??</option>
                  </select>
                      </div>
                  </div>
            </div>
            <div className="form-group">
            <label htmlFor="recipient-name" className="control-label">??p d???ng t??? ng??y</label>
                          <input type="text" className="form-control mydatepicker" name="ngayapdung" id="ngayapdung" placeholder="mm/dd/yyyy" onChange={this.handleFieldChange}  defaultValue="5/11/2020" /> 
            </div>
            <div className="form-group">
            <label htmlFor="recipient-name" className="control-label">?????n ng??y</label>
                          <input type="text" className="form-control mydatepicker" name="denngay" id="denngay" placeholder="mm/dd/yyyy" onChange={this.handleFieldChange}  defaultValue="20/11/2020" /> 
            </div>
              <div className="form-group">
                  <select className="form-control" name="nhomthanhvien" id="nhomthanhvien" onChange={this.handleFieldChange}>
                  <option value="0">Ch???n nh??m kh??ch h??ng</option>
                        
                        {nhomkhachhang.map(nkh => ( 
                          <option value={nkh.id}>{nkh.nhomnguoi}</option>
                        ))}
                  </select>
                  </div>
            <div className="modal-footer">
          <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY L???I</button>
          <button type="submit" className="btn btn-primary" >L??U L???I</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
  <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">??</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">C???p Nh???t Ch????ng Tr??nh Khuy???n M??i</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateChuongTrinh}>
          <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">T??n ch????ng tr??nh</label>
              <input type="text" className="form-control" name="tenchuongtrinh" id="updatetenchuongtrinh" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
                  <div className="row">
                      <div className="col-md-7">
                      <label htmlFor="recipient-name" className="control-label">???????c gi???m</label>
                      <input type="text" className="form-control" name="duocgiam" id="updateduocgiam" onChange={this.handleFieldChange} /> 
                      </div>
                      <div className="col-md-5">
                      <label htmlFor="recipient-name" className="control-label">????n v???</label>
                      <select className="form-control" name="donvi" id="updatedonvi" onChange={this.handleFieldChange}>
                        <option value="ch??a ch???n">Ch??a ch???n</option>
                        <option value="%">%</option>
                        <option value="%">VN??</option>
                  </select>
                      </div>
                  </div>
            </div>
            <div className="form-group">
            <label htmlFor="recipient-name" className="control-label">??p d???ng t??? ng??y</label>
                          <input type="text" className="form-control mydatepicker" name="ngayapdung" id="updatengayapdung" placeholder="mm/dd/yyyy" onChange={this.handleFieldChange}  /> 
            </div>
            <div className="form-group">
            <label htmlFor="recipient-name" className="control-label">?????n ng??y</label>
                          <input type="text" className="form-control mydatepicker" name="denngay" id="updatedenngay" placeholder="mm/dd/yyyy" onChange={this.handleFieldChange} /> 
            </div>
              <div className="form-group">
                  <select className="form-control" name="nhomthanhvien" id="updatenhomthanhvien" onChange={this.handleFieldChange}>
                  <option value="0">Ch???n nh??m kh??ch h??ng</option>
                  {nhomkhachhang.map(nkh => ( 
                          <option value={nkh.id}>{nkh.nhomnguoi}</option>
                        ))}
                  </select>
                  </div>
            <div className="modal-footer">
          <button type="button" id="btn-ends" className="btn btn-default btn-end" data-dismiss="modal">QUAY L???I</button>
          <button type="submit" className="btn btn-primary" >L??U L???I</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
  </div>
  )
}
}

export default ChuongTrinhKhuyenMai