import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from "aiya_sdk_node";
import Cookies from 'universal-cookie'
import { Table, Modal } from 'antd'
import { Input, Col, Row, Label, Button, ButtonGroup } from 'reactstrap';
import 'antd/dist/antd.css';
const cookies = new Cookies()

const fields = ["name", "description", "standard_rate", "brand", "item_name"];
const filters = { disabled: 0 };



class App extends Component {

    state = { visible: false }
    showModal = (id) => {
        this.setState({
            visible: true,
            currentModal: this.state.dataSource[id]
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
    componentWillMount() {
        api.module = 'nsc'
        api.get_list("NS Member", '*')
            .then(res => {
                let dataSource = []
                res.message.map((message, index) => {
                    const person = { ...message, key: index }
                    dataSource.push(person)
                })

                this.setState({ dataSource });
            });

    }

    onStateChange = () => {
        const valid = Object.values(this.state).reduce((sum, array) => {
          if (sum === false) {
            return sum
          }
          if (array === '') {
            return false
          }
          return sum
        }, true)
    
        this.setState({ buttonStatus: !valid })
      }
    

    toggleCheckkbox = (event) => {
        const { name } = event.target
        const checkbox = { ...this.state.checkbox }
        checkbox[name] = !checkbox[name]
        this.setState({ checkbox })
    }
    componentDidMount() {
    }

    signup = () => {

        const data = {"data":{"doctype":"NS Member",
        "awards": [{
    "type": this.state.type,
    "joined_year": this.state.joined_year,
    "project_stage": this.state.project_stage,
    "reward": this.state.reward,
    "project_title": this.state.project_title 
    }],
    "education_level":this.state.education,
    "salutation":this.state.salutation,
    "first_name":this.state.first_name,
    "last_name":this.state.last_name,
    "phone":this.state.phone,
    "email":this.state.email,
    "line":this.state.line,
    "facebook":this.state.facebook,
    "company":this.state.company,
    "company_address":this.state.company_address,
    "position":this.state.position,
    "company_description":this.state.company_description,
    "university":this.state.university
}
    }
   
    api.call({
        method: 'nsc.client.register',
        args : data
      }).then(res => {
        window.location.reload();
      })
 console.log(data)
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
            joined_year:'',
            salutation:'นาย',
            pricename:'',
            project_title:'',
            dataSource:[],
            education:'ปริญญาตรี',
            status:'',
            businessDes:'',
            type:'NSC',
            project_stage:'ผ่านรอบข้อเสนอโครงการ',
            reward:'',
            company:'',
            company_description:'',
            position:'',
            company_address:'',
            registerPage: false,
            data:null,
            visible:false,
            currentModal:0,
            buttonStatus: true,
        }
        
        this.columns = [{
            title: 'ชื่อ',
            dataIndex: 'first_name',
            key: 'first_name',
        }, {
            title: 'นามสกุล',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'ข้อมูลทั้งหมด', dataIndex: '', key: 'x', render: (record) => <a href="#" onClick={() => this.showModal(record.key)} >ดูข้อมูล</a>
        },
        ];
    }
    handleText = (event) => {
        const { name, value } = event.target
        const state = {}
        state[name] = value
        this.setState(state)
        if(this.state.email&&this.state.first_name&&this.state.last_name&&this.state.phone&&
            this.state.joined_year&&this.state.university&&this.state.company&&this.state.company_address
            &&this.state.position&&this.state.company_description !== '')
        {
            // 
            this.setState({
                buttonStatus: false,
              });
        }
        else{
            this.setState({
                buttonStatus: true,
              });
        }
    }
    render() {

        return (
            <div style={{ backgroundColor: '#3b5998' }}>
                <div className='logo'>
                    <img className='cologo' src="http://fic.nectec.or.th/sites/fic.nectec.or.th/files/NSC2018/NSC2018-Poster-Header.jpg" />
                </div>
                <div style={{ textAlign: 'center', margin: '10px' }} >

                    <Button color="primary" className='button' onClick={() => this.setState({ registerPage: false })}>ทำเนียบรุ่น NSC</Button>
                    <Button color="primary" className='button' onClick={() => this.setState({ registerPage: true })}>ลงทะเบียนศิษย์เก่า NSC</Button>

                </div>
     
                <div className='form-frame'>


                    {this.state.registerPage ?

<div>
<Row>
    <Col className='salutation' xs="2">
    <Label>
       คำนำหน้าชื่อ<text className='checklist'>*</text>
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
        ชื่อ<text className='checklist'>*</text>
        </Label>
        <Input type='text' value={this.state.first_name} name='first_name' className='' onChange={this.handleText} />
    </Col>
    <Col  xs="5"> 
    <Label>
        นามสกุล<text className='checklist'>*</text>
        </Label>
        <Input type='text' value={this.state.last_name} name='last_name' className='' onChange={this.handleText} />
    </Col>
    </Row>
    <Row>
        <Col>
    <Label>
        การศึกษาสูงสุด<text className='checklist'>*</text>
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
        มหาวิทยาลัย<text className='checklist'>*</text>
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
                Email<text className='checklist'>*</text>
                </Label>
                <Input type='email' value={this.state.email} name='email' className='' onChange={this.handleText} required  />
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
                Phone<text className='checklist'>*</text>
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
    <Col className='salutation' xs="2">
    <Label>
    เยาวชนโครงการ<text className='checklist'>*</text>
        </Label>
  <Input type='select' value={this.state.type} name='type'  onChange={this.handleText} >
  <option value={'NSC'}>
  NSC
      </option>
      <option value={'YSC'}>
      YSC
      </option>
      <option value={'YECC'}>
      YECC
      </option></Input>
    </Col>
    <Col  xs="5"> 
    <Label>
    รุ่นที่เท่าไหร่ ค.ศ.<text className='checklist'>*</text>(ตย. รุ่นที่ 20 ค.ศ. 2018)
        </Label>
        <Input type='text' value={this.state.joined_year} name='joined_year' className='' onChange={this.handleText} />
    </Col>
    <Col  xs="5"> 
    <Label>
    ชื่อผลงานที่ส่งเข้าประกวด
        </Label>
        <Input type='text' value={this.state.project_title} name='project_title' className='' onChange={this.handleText}/>
    </Col>
    </Row>
            <Row>

                <Col>
                <Label>
                ผลการแข่งขัน<text className='checklist'>*</text>

                </Label>
    <Input type='select' value={this.state.project_stage} name='project_stage' className='' onChange={this.handleText}  >
  <option value={'ผ่านรอบข้อเสนอโครงการ'}>
  ผ่านรอบข้อเสนอโครงการ
      </option>
      <option value={'ผ่านถึงรอบนำเสนอผลงาน'}>
      ผ่านถึงรอบนำเสนอผลงาน
      </option>
      <option value={'เข้ารอบชิงชนะเลิศ'}>
      เข้ารอบชิงชนะเลิศ
      </option>
      <option value={'ได้รับรางวัล'}>
      ได้รับรางวัล (กรณีมีเลือกข้อนี้ให้ระบุรางวัลที่ได้รับ)
      </option>
      </Input>
      </Col>
      <Col>
      <Label>
      รางวัลที่ได้รับจากรอบชิงชนะเลิศ

                </Label>
                <Input type='text' value={this.state.reward} name='reward' className='' 
                disabled={this.state.project_stage!=='ได้รับรางวัล'}
                onChange={this.handleText}  />
            </Col>
      </Row>
                <div className='line' />
            <p>
        บริษัท
        </p>
            <Row>
            <Col>
         
         <Label>
             ชื่อบริษัท<text className='checklist'>*</text>
             </Label>
             <Input type='email' value={this.state.company} name='company' className='' onChange={this.handleText} />
         </Col>
         <Col>
         <Label>
         ตำแหน่ง<text className='checklist'>*</text>
             </Label>
             <Input type='text' value={this.state.position} name='position' className='' onChange={this.handleText} />
         </Col>
         <Col>
         <Label>
             ที่อยู่บริษัท<text className='checklist'>*</text>
             </Label>
             <Input type='text' value={this.state.company_address} name='company_address' className='' onChange={this.handleText} />
         </Col>
            </Row>
            <Row>
            <Col>
         <Label>
         อธิบายสั้นๆ เกี่ยวกับธุรกิจที่ทำงานอยู่<text className='checklist'>*</text>
             </Label>
             <Input type='textarea' value={this.state.company_description} name='company_description' className='textarea' onChange={this.handleText} />
         </Col>
                </Row>
                <Button  
                disabled={this.state.buttonStatus} 
                color="success" 
                block className='button' 
                onClick={this.signup}
                > สมัคร</Button>
    </div>: 
    <div className='form-frame'>
            <Table dataSource={this.state.dataSource} columns={this.columns} userRowSelect="onUserRowSelect($event)"  />
    </div>
   }    
                    <Modal
                        title="ข้อมูลทั้งหมด"
                        onCancel={() => { this.setState({ visible: false }) }}
                        visible={this.state.visible}
                     
                        footer={[
                            <Button key="submit" color="primary" onClick={() => { this.setState({ visible: false }) }}>
                              OK
                            </Button>,
                          ]}
                    >
                        {console.log(this.state)}
                        <h2>Personal</h2>
          <p>ชื่อ : {this.state.currentModal.full_name}</p>
          <p>การศึกษาสูงสุด : {this.state.currentModal.education_level}</p>
          <p>สถาบันการศึกษา : {this.state.currentModal.university}</p>
          <h2>Contact</h2>
          <p>Email : {this.state.currentModal.email}</p>
          <p>Facebook : {this.state.currentModal.facebook} </p>
          <p>Phone : {this.state.currentModal.phone}</p>
          <p>Line : {this.state.currentModal.line}</p>
          <h2>Company</h2>
          <p>ชื่อบริษัท : {this.state.currentModal.company}</p>
          <p>ต่ำแหน่ง : {this.state.currentModal.position}</p>
          <p>ที่อยู่บริษัท : {this.state.currentModal.company_address}</p>
          <p>อธิบายสั้นๆเกี่ยวกับบริษัท : {this.state.currentModal.company_description}</p>

                    </Modal>
                </div>
              
            </div>

        );
    }
}

export default App;
