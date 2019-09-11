import React, {useState, useEffect} from 'react';
import { eztz } from 'eztz';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert'


const  Verifier = props => {

  const CONTRACT_ADDR = 'KT1PuiY1QmvY7tvrbm94AoUDtEpqiA7BybZG';

  const [address, setAddress] = useState();
  const [alert, setAlert] = useState({type: 'info', message:  'waiting'});

  useEffect(() => {eztz.node.setProvider("https://tezos-dev.cryptonomic-infra.tech");}, []);
  //useEffect(() => {eztz.node.setProvider("https://alphanet.tezrpc.me");}, [])

  const getCertStatus = (contractAddress) => {
    setAlert({type: '', message: "checking the Alphanet..."});
    eztz.contract.storage(CONTRACT_ADDR)
      .then(contractStorage => {
        console.debug(JSON.stringify(contractStorage, null, 4));
        const students = contractStorage.args[0];
        const inputVal = address;
        const found = students.find(student => student.args[0]["string"] === inputVal);
  
        if(found !== undefined) {
          setAlert({
            type: 'success', 
            message: `certification status ${found.args[1]["prim"].toString()}`
          });
        } else {
          setAlert({type: 'warning', message: 'student not found'});
        }
      })
      .catch(e => {
        setAlert({type: 'danger', message: e})
        console.error(e);
      });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(address);
    getCertStatus(CONTRACT_ADDR);
  }

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          type="text" placeholder="Enter address" 
          onChange={e => setAddress(e.target.value)}
        />
        <InputGroup.Append>
          <Button variant="primary" type="submit" onClick={handleSubmit}>Check</Button>
        </InputGroup.Append>
      </InputGroup>

      <Alert variant={alert.type} className="mb-3">
        {alert.message}
      </Alert>
    </div>
  );
}

export default Verifier;