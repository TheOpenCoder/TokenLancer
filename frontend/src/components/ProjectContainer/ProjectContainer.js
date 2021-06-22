import React from 'react';
import Popup from 'reactjs-popup';
import './ProjectContainer.css';
import user_name from '../../user_name'

class ProjectContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tokensPerHour: '',
            totalHours: '',
            description: '',
            tokenlancer: user_name,
            hirer: this.props.job.hirer,
            jobId: this.props.job.jobId
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // collectData = () => {
    //     this.setState({ hirer: this.props.hirer });
    //     this.setState({ jobId: this.props.job.jobId });
        // fetch(`https://tokenlancer.uc.r.appspot.com/api/accountservice/${user_name}/tokenlancer/all-jobs`, {
        //     method: 'GET'
        // })
        //     // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response => response.json())
        //     .then(user => this.setState({ jobs: user }))
    // }

    handleSubmit = (event) => {
        // alert('A form was submitted: ' + this.state);

        fetch('https://tokenlancer.uc.r.appspot.com/api/jobservice/tokenlancer/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(this.state)
        })
            .then(function (response) {
                console.log(response)
                return response.json();
            });

        event.preventDefault();
    }

    render() {
        return (
            <div className='project' key={this.props.job.jobId}>
                <div className="project__bottom">
                    <h4>Posted By : {this.props.job.hirer}</h4> {/* name for hirer */}
                    <h2>{this.props.job.title}</h2> {/* name for Job */}
                    <div className='background'>
                        <h3>{this.props.job.description}</h3> {/* Job description*/}
                    </div>
                    <h4>Skills: {this.props.job.skills}</h4> {/* skills required */}
                    <Popup
                        trigger={<button class="bubbly-button button" > ✔ Apply </button>}
                        modal
                        nested
                    >

                        {close => (
                            <div className='conflict'>
                                <div className="modals">
                                    <button className="close" onClick={close}>
                                        &times;
                                </button>
                                    <div className="header"> {this.props.job.title} </div>
                                    <div className="content">
                                        <form onSubmit={this.handleSubmit} className='form'>
                                            {console.log(this.state.jobId + ' one')}
                                            {/* {console.log(this.props.job.hirer) + 'testone'} */}
                                            {console.log(this.state.hirer + ' two')}
                                            {/* {console.log(this.props.job.jobId) + 'testtwo'} */}
                                            {console.log(this.state.tokenlancer + ' three')}
                                            <div className='material-textbox formItems' id='tokensPerHour'>
                                                <input type="text" value={this.state.value} name="tokensPerHour" onChange={this.handleChange} required />
                                                <label>Price of hourly tokens</label>
                                            </div>
                                            <div className='material-textbox formItems' id='totalHours'>
                                                <input type="text" value={this.state.value} name="totalHours" onChange={this.handleChange} required />
                                                <label>Approximate no. of hours to finish</label>
                                            </div>
                                            <div className='material-textbox formItems' id='description'>
                                                <input type="text" value={this.state.value} name="description" onChange={this.handleChange} required />
                                                <label>Tell me about yourself</label>
                                            </div>

                                            <input type="submit" value="Submit" className='bubbly-button button' />
                                        </form>
                                    </div>
                                </div>
                            </div>

                        )}
                    </Popup>
                </div>
            </div>
        );
    }
}
export default ProjectContainer;