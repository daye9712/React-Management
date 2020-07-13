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

class EmployeeUpdate extends React.Component {

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
            open: false,
            modeState: 'update'
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.updateEmployee()
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
            open: false,
            modeState: 'update'
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

    updateEmployee = () => {
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
        formData.append('modeState', this.state.modeState);
        formData.append('empNo', this.state.empNo);
        formData.append('fileName', this.state.fileName);
        const config = {
            headers : {
                'content-type': 'multipart/form-data'
            }
        };
        return post(url, formData, config);
    }
    
    handleClickOpen = () => {
        this.setState({
            empNo: this.props.empNo,
            file: this.props.empProfile,
            fileName: this.props.fileName,
            empName: this.props.empName,
            title: this.props.title,
            entryDate: this.props.entryDate,
            phone: this.props.phone,
            email: this.props.email,
            deptName: this.props.deptName,
            birthday: this.props.birthday,
            gender: this.props.gender,
            open: true,
            modeState: 'update'
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
            open: false,
            modeState: 'update'
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                    수정
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>사원 정보 수정</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <img src={this.state.file} alt="profile"/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                프로필 사진 수정
                            </Button>
                        </label>
                        <br/><br/>
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

export default withStyles(styles)(EmployeeUpdate);