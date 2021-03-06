import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class EmployeeAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            empName: '',
            title: '',
            entryDate: '',
            phone: '',
            email: '',
            deptName: '',
            birthday: '',
            gender: '',
            fileName: '',
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addEmployee()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            empName: '',
            title: '',
            entryDate: '',
            phone: '',
            email: '',
            deptName: '',
            birthday: '',
            gender: '',
            fileName: '',
            open: false
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addEmployee = () => {
        const url = 'api/employees';
        const formData = new FormData();
        formData.append('empProfile', this.state.file);
        formData.append('empName', this.state.empName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('title', this.state.title);
        formData.append('phone', this.state.phone);
        formData.append('email', this.state.email);
        formData.append('entryDate', this.state.entryDate);
        formData.append('deptName', this.state.deptName);
        const config = {
            headers : {
                'content-type': 'multipart/form-data'
            }
        };
        return post(url, formData, config);
    }
    
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            empName: '',
            title: '',
            entryDate: '',
            phone: '',
            email: '',
            deptName: '',
            birthday: '',
            gender: '',
            fileName: '',
            open: false
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    사원 등록
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>사원 등록</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="empName" value={this.state.empName} onChange={this.handleValueChange} /><br/>
                        <TextField label="생년월일" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br/>
                        <TextField label="직책" type="text" name="title" value={this.state.title} onChange={this.handleValueChange} /><br/>
                        <TextField label="전화번호" type="text" name="phone" value={this.state.phone} onChange={this.handleValueChange} /><br/>
                        <TextField label="이메일" type="text" name="email" value={this.state.email} onChange={this.handleValueChange} /><br/>
                        <TextField label="입사일" type="text" name="entryDate" value={this.state.entryDate} onChange={this.handleValueChange} /><br/>
                        <TextField label="소속" type="text" name="deptName" value={this.state.deptName} onChange={this.handleValueChange} /><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>등록</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default withStyles(styles)(EmployeeAdd);