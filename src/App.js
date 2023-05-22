import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useState} from 'react';

function App() {

  const init = {
    rno:0,
    name:"",
    sub1:0,
    sub2:0,
    sub3:0,
    sub4:0,
    sub5:0,
  }

  const [val,setVal] = useState(init);
  const [alldata,setAllData] = useState([]);
  const [search,setSearch] = useState();
  const [editid,setEditid] = useState(-1);
  const [isedit,setIsedit] = useState(false);

  const handleChange = (e) => {
    setVal({...val,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    val.total = parseInt(val.sub1) + parseInt(val.sub2) + parseInt(val.sub3) + parseInt(val.sub4) + parseInt(val.sub5);
    val.per = val.total / 5;
    val.min = Math.min(val.sub1,val.sub2,val.sub3,val.sub4,val.sub5);
    val.max = Math.max(val.sub1,val.sub2,val.sub3,val.sub4,val.sub5);

    if(val.per>70)
    {
      val.grade = 'First';
    }
    else if(val.per>60)
    {
      val.grade = 'Second';
    }
    else
    {
      val.grade = 'Third'
    }

    if(isedit)
    {
     let edata = [...alldata];
      edata[editid] = val;
      setAllData(edata);
      setIsedit(false);
    }
    else
    {
      setAllData(alldata => [...alldata,val]);
    }

    e.target.rno.value = '';
    e.target.name.value = '';
    e.target.sub1.value = '';
    e.target.sub2.value = '';
    e.target.sub3.value = '';
    e.target.sub4.value = '';
    e.target.sub5.value = '';
    
  }

  const handleDelete = (k) => {

    const newArray = alldata.filter((t,i) => i !== k);
    setAllData(newArray);

  }
  const handleEdit = (k) => {
      setEditid(k);
      setIsedit(true);
      const newArray = alldata[k];
      setVal(newArray);
  }

  return (
    <div className="App">
      <div className='text-center py-4'>
        <h1>Student Result</h1>
      </div>
      <div className='form_area pb-0'>
        <Form className='mb-0 pb-0' onSubmit={handleSubmit}>
          <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
            <Form.Label className='w-10'>Roll No: </Form.Label>
            <Form.Control type="number" placeholder="Enter RollNo here" name='rno' className='ms-3 w-25' value={isedit ? val.rno : undefined } onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
            <Form.Label className='w-10'>Name : </Form.Label>
            <Form.Control type="text" placeholder="Enter Name here" name='name' className='ms-3 w-50'  value={isedit ? val.name : undefined } onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
            <Form.Label className='w-10'>Gujrati : </Form.Label>
            <Form.Control type="number" placeholder="Enter Marks here" name='sub1' className='ms-3 w-50' value={isedit ? val.sub1 : undefined } onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
            <Form.Label className='w-10'>Account : </Form.Label>
            <Form.Control type="number" placeholder="Enter Marks here" name='sub2' className='ms-3 w-50'  value={isedit ? val.sub2 : undefined } onChange={handleChange}/>
          </Form.Group> <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
            <Form.Label className='w-10'>Stat : </Form.Label>
            <Form.Control type="number" placeholder="Enter Marks here" name='sub3' className='ms-3 w-50' value={isedit ? val.sub3 : undefined } onChange={handleChange} />
          </Form.Group> <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
            <Form.Label className='w-10'>English : </Form.Label>
            <Form.Control type="number" placeholder="Enter Marks here" name='sub4' className='ms-3 w-50'  value={isedit ? val.sub4 : undefined }onChange={handleChange}/>
          </Form.Group> <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
            <Form.Label className='w-10'>Economics : </Form.Label>
            <Form.Control type="number" placeholder="Enter Marks here" name='sub5' className='ms-3 w-50' value={isedit ? val.sub5 : undefined } onChange={handleChange} />
          </Form.Group>
          <div className='text-center pt-2'>
            <Button variant="danger" className='btnsub' type="submit" >
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <div className='text-center w-25 mx-auto my-5' >
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value = {search}
            onChange={(e) => setSearch(e.target.value)}
          
          />
          <Button variant="danger" >Search</Button>
        </Form>
      </div>
      <div className='table_area pt-2 text-center'>
        <Table striped bordered hover variant="light" className='w-100'>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>First Name</th>
              <th>Gujrati</th>
              <th>Account</th>
              <th>Stat</th>
              <th>English</th>
              <th>Economics</th>
              <th>Total</th>
              <th>Percentage</th>
              <th>Min</th>
              <th>Max</th>
              <th>Grade</th>
              <th>Delete</th>
              <th>Edit</th>

            </tr>
          </thead>
          <tbody>
            {
              alldata.filter((elm) => {
                if(search)
                {
                  return elm.name.includes(search);
                }
                else
                {
                  return elm;
                }
              }).map((item,index)=> {
                return(
                  <tr key={index}>
                  <td>{item.rno}</td>
                  <td>{item.name}</td>
                  <td>{item.sub1}</td>
                  <td>{item.sub2}</td>
                  <td>{item.sub3}</td>
                  <td>{item.sub4}</td>
                  <td>{item.sub5}</td>
                  <td>{item.total}</td>
                  <td>{item.per}</td>
                  <td>{item.min}</td>
                  <td>{item.max}</td>
                  <td>{item.grade}</td>
                  <td><Button veriant="primary" onClick={() => handleDelete(index)}>Delete</Button></td>
                  <td><Button veriant="primary" onClick={() => handleEdit(index)}>Edit</Button></td>
                </tr>
                )
              })
              
         
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
