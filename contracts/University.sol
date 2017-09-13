pragma solidity ^0.4.0;

contract University {
    address private sofocle = msg.sender;
    struct Record {
        string name;
        string fname;
        string email;
        string dob;
        uint passyear;
        uint roll;
        uint marks;
        bool status;
    }

    struct Uni {
        address ua;
        string title;
        uint numRecords;
        mapping(uint => Record) records;
    }
    mapping (address => Uni) univ;

    function addUniversity(address a, string t) returns(uint numID) {
        univ[a].ua = a;
        univ[a].title = t;
        return 1;
    }

    function getUniversity(address a) returns(address,string,uint) {
        return (univ[a].ua,univ[a].title,univ[a].numRecords);
    }

    function addRecord(address a, string _name, uint _roll, uint _marks,bool _status, string _fname, string _email, string _dob, uint _passyear) returns(bool) {
        Uni u = univ[a];
        u.records[u.numRecords++] = Record({name:_name,roll:_roll,marks:_marks,status:_status,fname:_fname,email:_email,dob:_dob,passyear:_passyear});
        return true;
    }

    function getRecord(address _index1, uint _index2) returns (string,uint,uint,string,string) {
        return(univ[_index1].records[_index2].name,
        univ[_index1].records[_index2].roll,
        univ[_index1].records[_index2].marks,
        univ[_index1].records[_index2].email
        univ[_index1].records[_index2].fname);
    }
}

