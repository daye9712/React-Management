import React, { Component } from 'react';
import './App.css';
import Employee from './components/Employee';

const employees = [
  {
    'id' : 1,
    'image' : 'http://placeimg.com/64/64/1',
    'name' : '홍길동',
    'birthday' : '961222',
    'gender' : '남자',
    'job' : '대학생'
  },
  {
    'id' : 2,
    'image' : 'http://placeimg.com/64/64/2',
    'name' : '홍길순',
    'birthday' : '970831',
    'gender' : '여자',
    'job' : '대학생'
  },
  {
    'id' : 3,
    'image' : 'http://placeimg.com/64/64/2',
    'name' : '김길동',
    'birthday' : '981207',
    'gender' : '남자',
    'job' : '프로그래머'
  }
]

class App extends Component {
  render() {
    return (
      <div>
        {
          employees.map(c => {
            return (
              <Employee
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}></Employee>
            );
          })
        }
      </div>
    );
  }
}

export default App;
