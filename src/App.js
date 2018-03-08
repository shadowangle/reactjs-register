import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from "aiya_sdk_node";
import Cookies from 'universal-cookie'
import {Table,Modal} from 'antd'
import { Input, Col, Row,Label, Button, ButtonGroup } from 'reactstrap';
import 'antd/dist/antd.css';
const cookies = new Cookies()

const fields = ["name", "description", "standard_rate", "brand", "item_name"];
const filters = { disabled: 0 };


 
class App extends Component {

    state = { visible: false }
    showModal = (id) => {
      this.setState({
        visible: true,
        currentModal:id
      });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
componentWillMount () {
  api.module='nsc'
api.get_list("NS Member", '*')
.then(res => {
  console.log(res.message)
  let dataSource=[]
  res.message.map((message,index)=>{
    const person={...message, key:index}
    // console.log(person)
    dataSource.push(person)
    console.log(dataSource)
  })
 
      this.setState({ dataSource });
});

}



toggleCheckkbox = (event) => {
    const { name } = event.target
    const checkbox = {...this.state.checkbox}
    checkbox[name] = !checkbox[name]
    this.setState({checkbox})
}
 componentDidMount() {
//หลังบ้านส่วน members: http://admin.nsc.aiya.ai/desk#List/NS Member/List

//get all NS members   สังเกตarg แรก คือพิมพ์ตาม "NS Member" ใน url เลย
// api.login("shadowangle1222@gmail.com","0892471456").then(result => {
//   // console.log(result)

// })
// api.module='nsc'
// api.get_list("NS Member", '*')
// .then(res => {
//   console.log(res)
// });



  //  console.log(api.get_list)
//add a single object
const data = {
"awards": [{
    "type": "NSC",
    "joined_year": "2018",
    "project_stage": "ได้รับรางวัล",
    "reward": "รางวัลที่ 2",
    "project_title": "AIYA"
}]
,"education_level":"ปริญญาตรี","description":"","salutation":"Mr","first_name":"Natthagid","last_name":"Thommachot"
}

 }

 signup = () => {
   
    const data = {"data":{"doctype":"NS Member",
        "awards": [{
    "type": this.state.awardtype,
    "joined_year": this.state.generation,
    "project_stage": "ได้รับรางวัล",
    "reward": this.state.projectTitle,
    "project_title": this.state.pricename 
    }],
    "education_level":this.state.education,
    "description":this.state.businessDes,
    "salutation":this.state.salutation,
    "first_name":this.state.first_name,
    "last_name":this.state.last_name,
    "phone":this.state.phone,
    "line":this.state.line,
    "facebook":this.state.facebook,
    "company":this.state.company,
    "position":this.state.position,
    "company_description":this.state.businessDes
}
    }
    api.call({
        method: 'nsc.client.register',
        args : data
      }).then(res => {
        // this.result = JSON.stringify(res, null, 2)
        console.log(res)
      })
     
        this.setState({registerPage : false })
  }
  
 constructor(props) {
    super(props)
    this.state = {
        email: '',
        first_name:'',
        last_name:'',
        phone:'',
        line:'',
        facebook:'',
        generation:'',
        salutation:'นาย',
        pricename:'',
        projectTitle:'',
        dataSource:[],
        education:'ปริญญาตรี',
        status:'',
        businessDes:'',
        awardtype:'',
        company:'',
        registerPage: false,
        data:null,
        visible:false,
        currentModal:0
    }
    this.columns = [{
        title: 'Name',
        dataIndex: 'first_name',
        key: 'first_name',
      },{
        title: 'Surename',
        dataIndex: 'last_name',
        key: 'last_name',
      },
      { title: 'Action', dataIndex: '', key: 'x', render: (record) => <a href="#" onClick={()=> this.showModal(record.key,record.company)} >Show Modal</a> 
     },
    //   {
    //     title: 'Surename',
    //     dataIndex: 'last_name',
    //     key: 'last_name',
    //   }
    ];
}
handleText = (event) => {
    const { name, value } = event.target  
    const state={}
    state[name] = value
    this.setState(state)
    
  }
  render() {

    return (
        <div style={{backgroundColor: '#3b5998'}}>
            <div className='logo'>
            <img className='cologo'src="http://fic.nectec.or.th/sites/fic.nectec.or.th/files/NSC2018/NSC2018-Poster-Header.jpg"/>
                </div>
    <div className='form-frame'>
  
       <div style={{textAlign:'center',margin: '10px'}} >
      <ButtonGroup>
  <Button color="primary"  onClick={() => this.setState({registerPage : false})}>ทำเนียบรุ่น NSC</Button>
   <Button color="primary"  onClick={() => this.setState({registerPage : true})}>ลงทะเบียนศิษย์เก่า NSC</Button>
   </ButtonGroup>
   </div>
     {this.state.registerPage? 
      
   <div>
    <Row>
        <Col className='salutation' xs="2">
        <Label>
            คำนำหน้าชื่อ
            </Label>
      <Input type='select' value={this.state.salutation} name='salutation'  onChange={this.handleText} >
      <option value={'นาย'}>
      นาย
          </option>
          <option value={'นางสาว'}>
          นางสาว
          </option>
          <option value={'นาง'}>
          นาง
          </option></Input>
        </Col>
        <Col  xs="5"> 
        <Label>
            ชื่อ
            </Label>
            <Input type='text' value={this.state.first_name} name='first_name' className='' onChange={this.handleText} />
        </Col>
        <Col  xs="5"> 
        <Label>
            นามสกุล
            </Label>
            <Input type='text' value={this.state.last_name} name='last_name' className='' onChange={this.handleText}/>
        </Col>
        </Row>
        <Row>
            <Col>
        <Label>
            การศึกษาสูงสุด
            </Label>
        <Input type='select' value={this.state.education} name='education' className='' onChange={this.handleText} >
      <option value={'ปริญญาตรี'}>
      ปริญญาตรี
          </option>
          <option value={'ปริญญาโท'}>
          ปริญญาโท
          </option>
          <option value={'ปริญญาเอก'}>
          ปริญญาเอก
          </option>
          <option value={' อื่นๆ'}>
          อื่นๆ
          </option></Input>
          </Col>
          <Col> 
        <Label>
            มหาวิทยาลัย
            </Label>
            <Input type='text' value={this.state.university} name='university' className='' onChange={this.handleText}  />
        </Col>
            </Row>
            <div className='line' />
            <p>
            Contract
            </p>
            <Row>
        
                <Col>
             
                <Label>
                    Email
                    </Label>
                    <Input type='email' value={this.state.email} name='email' className='' onChange={this.handleText} />
                </Col>
                <Col>
                <Label>
                    Facebook
                    </Label>
                    <Input type='text' value={this.state.facebook} name='facebook' className='' onChange={this.handleText}  />
                </Col>
                </Row>
               
            <Row>
                <Col>
                <Label>
                    Phone
                    </Label>
                    <Input type='email' value={this.state.phone} name='phone' className='' onChange={this.handleText}  />
                </Col>
                <Col>
                <Label>
                    Line
                    </Label>
                    <Input type='text' value={this.state.line} name='line' className='' onChange={this.handleText} />
                </Col>
                </Row>
                <div className='line' />
                <p>
            รางวัล
            </p>
                <Row>
                    <Col>
           
        <Input type='select' value={this.state.reward} name='reward' className='' onChange={this.handleText} >
      <option value={'ผ่านรอบข้อเสนอโครงการ'}>
      ผ่านรอบข้อเสนอโครงการ
          </option>
          <option value={'ผ่านถึงรอบนำเสนอผลงาน'}>
          ผ่านถึงรอบนำเสนอผลงาน
          </option>
          <option value={'เข้ารอบชิงชนะเลิศ'}>
          เข้ารอบชิงชนะเลิศ
          </option>
          <option value={'ได้รับรางวัล (กรณีมีเลือกข้อนี้ให้ระบุรางวัลที่ได้รับ)'}>
          ได้รับรางวัล (กรณีมีเลือกข้อนี้ให้ระบุรางวัลที่ได้รับ)
          </option>
          </Input>
          </Col>
          </Row>
          <Row>
              <Col>
          <Label>
                    อื่นๆ โปรดระบุ
                    </Label>
                    <Input type='text' value={this.state.otherReward} name='otherReward' className='' 
                    disabled={this.state.reward!=='ได้รับรางวัล (กรณีมีเลือกข้อนี้ให้ระบุรางวัลที่ได้รับ)'}
                    onChange={this.handleText}  />
                </Col>
                </Row>
                <Row>
                  
                    </Row>
                    <div className='line' />
                <p>
            Company
            </p>
                <Row>
                <Col>
             
             <Label>
                 Name
                 </Label>
                 <Input type='email' value={this.state.company} name='company' className='' onChange={this.handleText} />
             </Col>
             <Col>
             <Label>
                 Position
                 </Label>
                 <Input type='text' value={this.state.position} name='position' className='' onChange={this.handleText} />
             </Col>
             <Col>
             <Label>
                 Address
                 </Label>
                 <Input type='text' value={this.state.company_address} name='company_address' className='' onChange={this.handleText} />
             </Col>
                </Row>
                <Row>
                <Col>
             <Label>
             อธิบายสั้นๆ เกี่ยวกับธุรกิจที่ทำงานอยู่
                 </Label>
                 <Input type='textarea' value={this.state.company_description} name='company_description' className='textarea' onChange={this.handleText} />
             </Col>
                    </Row>
                    <Button color="success" block className='button'>สมัคร</Button>
        </div>: 
        <div className='form-frame'>
                <Table dataSource={this.state.dataSource} columns={this.columns} userRowSelect="onUserRowSelect($event)"  />
        </div>
       }
      <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={()=> {this.setState({visible:false})}}
          
        >
        {console.log(this.state.dataSource[this.state.currentModal])}
          <p>Personal</p>
          <p>Full Name : {this.state.currentModal}</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
        </div>
        </div>
//       <div className="App" style={{ backgroundColor: 'white'}}>
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           {/* <h1 className="App-title">Welcome to React</h1> */}
//         </header>
//        <div style={{margin:'0 auto'}} >
//    <Button type="primary" style={{margin: 10}} onClick={() => this.setState({registerPage : false})}>Show list</Button>
//     <Button type="primary" style={{margin: 10}} onClick={() => this.setState({registerPage : true})}>Register</Button>
//         </div>
//         <div className="main-content" hidden={this.state.registerPage !== true}>
//         <form className="form-basic" method="post" action="#">

 
//                 <div className="form-title-row">
//                    <h1>FORM Register</h1>

//                 </div>

                
//                 <Row>
//                 <Col style={{textAlign:'left',width:'100%'}}>
//                 <p>ที่อยู่อีเมล</p>
              
//               <input type="email" name="email" onChange={this.handleText} value={this.state.email} className='input' />
//                 </Col>
//                     </Row>
                
          
//                     <Row>
//                 <Col style={{textAlign:'left',width:'100%'}}>
//             <label>
//                 <span>คำนำหน้า</span>

//                   <div className="form-radio-buttons">

//                 <div>
//                     <label>
//                         <input type="radio" name="salutation" value="Mr." onChange={this.handleText} />
//                         <span style={{width: 0,paddingLeft: 0,
//                         paddingBottom: 0,
//                         paddingRight: 0,
//                         paddingTop: 0}}>
//                         นาย</span>
                        
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                     <input type="radio" name="salutation" value="Mrs." onChange={this.handleText} />
//                         <span style={{width: 0,paddingLeft: 0,
//                         paddingBottom: 0,
//                         paddingRight: 0,
//                         paddingTop: 0}}>
//                         นาง</span>
                        
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                     <input type="radio" name="salutation" value="Ms." onChange={this.handleText} />
//                         <span style={{width: 0,paddingLeft: 0,
//                         paddingBottom: 0,
//                         paddingRight: 0,
//                         paddingTop: 0}}>
//                         นางสาว</span>
                        
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                     <input type="radio" name="salutation" value="other" onChange={this.handleText} />
//                         <span style={{width: 80,paddingLeft: 0,
//                         paddingBottom: 0,
//                         paddingRight: 0,
//                         paddingTop: 0}}>
//                         อื่นๆ โปรดระบุ</span>
                        
//                     </label>
//                 </div>
//                 <div className="form-row" hidden={this.state.salutation !== "other"} >
//                 <label>
//                     <input type="text" name="salutationOther" onChange={this.handleText} value={this.state.salutationOther} />
//                 </label>
//             </div>
//             </div>
//             </label>
//             </div>

//              <div className="form-row">
//                 <label>
//                     <span>ชื่อจริง</span>
//                     <input type="text" name="first_name" onChange={this.handleText} value={this.state.first_name} />
//                 </label>
//             </div>
//             <div className="form-row">
//                 <label>
//                     <span>นามสกุล</span>
//                     <input type="text" name="last_name" onChange={this.handleText} value={this.state.last_name} />
//                 </label>
//             </div>
//             <div className="form-row">
//                 <label>
//                     <span>เบอร์มือถือ</span>
//                     <input type="text" name="phone" onChange={this.handleText} value={this.state.phone} />
//                 </label>
//             </div>
//             <div className="form-row">
//                 <label>
//                     <span>Line</span>
//                     <input type="text" name="line" onChange={this.handleText} value={this.state.line} />
//                 </label>
//             </div>
//             <div className="form-row">
//                 <label>
//                     <span>Facebook</span>
//                     <input type="text" name="facebook" onChange={this.handleText} value={this.state.facebook} />
//                 </label>
//             </div>



//  <div className="form-row">
//                 <label>
//                     <span>เยาวชนโครงการ</span>
//                 </label>
//                 <div className="form-radio-buttons"   >

//                     <div>
//                         <label>
//                             <input type="radio" value="NSC"  name="awardtype" onChange={this.handleText}/>
//                             <span>NSC</span>
//                         </label>
//                     </div>

//                     <div>
//                         <label>
//                             <input type="radio" value="YSC"  name="awardtype" onChange={this.handleText}/>
//                             <span>YSC</span>
//                         </label>
//                     </div>

//                     <div>
//                         <label>
//                             <input type="radio" value="YECC"  name="awardtype" onChange={this.handleText}/>
//                             <span>YECC</span>
//                         </label>
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <label>
//                         <span>รุ่นที่เท่าไหร่ ค.ศ.</span>
//                         <input type="text" name="generation" onChange={this.handleText} value={this.state.generation}/>
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label>
//                         <span>ชื่อผลงานที่ส่งเข้าประกวด</span>
//                         <input type="text" name="pricename" onChange={this.handleText} value={this.state.pricename}/>
//                     </label>
//                 </div>
//             </div>
//             <div className="form-row">
//                     <label>
//                         <span>ผลการแข่งขัน</span>
//                         <input type="checkbox" name="reward" onChange={this.toggleCheckkbox} checked={this.state.checkbox1} />
//                         <span >ผ่านรอบข้อเสนอโครงการ</span>

//                     </label>
//                     <label>
//                         <span> </span>
//                         <input type="checkbox" name="reward" onChange={this.toggleCheckkbox} checked={this.state.checkbox2} />
//                         <span >ผ่านถึงรอบนำเสนอผลงาน</span>

//                     </label>
//                     <label>
//                         <span> </span>
//                         <input type="checkbox" name="reward" onChange={this.toggleCheckkbox} checked={this.state.checkbox3} />
//                         <span >เข้ารอบชิงชนะเลิศ</span>

//                     </label>
//                     <label>
//                         <span> </span>
//                         <input type="checkbox" name="reward" onChange={this.toggleCheckkbox} checked={this.state.checkbox4} />
//                         <span >ได้รับรางวัล (กรณีมีเลือกข้อนี้ให้ระบุรางวัลที่ได้รับ)</span>

//                     </label>
//                 </div>


//                 <div className="form-row">
//                     <label>
//                         <span>รางวัลที่ได้รับจากรอบชิงชนะเลิศ</span>
//                         <input type="text" name="projectTitle" onChange={this.handleText} value={this.state.projectTitle}/>
//                     </label>
//                 </div>

//                 <div className="form-row">
//                     <label>
//                         <span>การศึกษาสูงสุด</span>
//                         <select name="education" onChange={this.handleText} >
//                             <option></option>
//                             <option>ปริญญาตรี</option>
//                             <option>ปริญญาโท</option>
//                             <option>ปริญญาเอก</option>
//                             <option>อื่นๆ</option>
//                         </select>
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label>
//                         <span>ระบุสถาบันการศึกษาตามข้อ 11</span>
//                         <input type="text" name="university" onChange={this.handleText} value={this.state.university}/>
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label>
//                         <span>ชื่อบริษัท</span>
//                         <input type="text" name="company" onChange={this.handleText} value={this.state.company}/>
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label>
//                         <span>ตำแหน่ง</span>
//                         <input type="text" name="position" onChange={this.handleText} value={this.state.position}/>
//                     </label>
//                 </div>
//                 <div className="form-row">
//                     <label>
//                         <span>อธิบายสั้นๆ เกี่ยวกับธุรกิจที่ทำงานอยู่</span>
//                         <input type="text" name="businessDes" onChange={this.handleText} value={this.state.businessDes}/>
//                     </label>
//                 </div>
//                     <Button type="primary" onClick={this.signup}>Submit Form</Button>
                   
//         </form>
       
//         </div>
//         <div hidden={this.state.registerPage !== false}>
//         <Table dataSource={this.state.dataSource} columns={this.columns} userRowSelect="onUserRowSelect($event)"  />
//         </div>
//         <Modal
//           title="Modal"
//           visible={this.state.visible}
//           onOk={()=> {this.setState({visible:false})}}
//         >
// {console.log(this.state.dataSource[this.state.currentModal])}
//           <p>Bla bla ... {this.state.currentModal}</p>
//           <p>Bla bla ...</p>
//           <p>Bla bla ...</p>
//         </Modal>
//       </div>

    );
  }
}

export default App;
