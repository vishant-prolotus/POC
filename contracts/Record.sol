pragma solidity ^0.4.2;

contract Record{

    address sofocle = msg.sender;
    uint snoUniversity;
    uint snoStudent;

    struct _Student{
        uint roll;
        string name;
        uint marks;
        bool pass;
    }

    struct _University{
        address uni;
        string id;
        mapping (uint => _Student) Student;
    }

    mapping (address => _University) University;

    function addUniversity(address a, string id) returns(bool){
        if(msg.sender != sofocle) return;
        University[a]=_University(a, id);
        snoUniversity++;
        return true;
    }

    function getUniversity(address a) constant returns(address, string){
        return(University[a].uni, University[a].id);
    }

    function addStudent(address a, uint roll, string name, uint marks, bool pass) returns(bool){
        if(msg.sender != University[a].uni) return;
        University[a].Student[roll] = _Student(roll, name, marks, pass);
        snoStudent++;
        return true;
    }

    function getStudent(address a, uint roll) constant returns(uint, string, uint, bool){
        return(University[a].Student[roll].roll, University[a].Student[roll].name, University[a].Student[roll].marks, University[a].Student[roll].pass);
    }
}