import React from 'react';
import './Features.css';
import Feature from './Feature';

function Features() {
    return (
        <div className="features">
            <div className="features__heading">
                <h1>How TokenLancer works? </h1>
            </div>
            <h2>FOR CLIENTS</h2>
            <div className="features__single">
                <Feature
                    src="https://www.f-cdn.com/assets/main/en/assets/home/redesign/need-work-done/post-a-job-redesign.svg"
                    title="Search a job"
                    content="Simply search for the job that you want help for and find a whole bunch of freelancers, expert in the respective fields. Filter them by your needs"
                />
                <Feature
                    src="https://www.f-cdn.com/assets/main/en/assets/home/redesign/need-work-done/choose-freelancers-redesign.svg"
                    title="Buy freelancers hours"
                    content="Buy tokens from freelancers, each token represents an hour of the freelancer. Buy less tokens, if you want to check, if this freelancer suits your project best."
                />
                <Feature
                    src="https://www.f-cdn.com/assets/main/en/assets/home/redesign/need-work-done/pay-safely-redesign.svg"
                    title="Buy more hours"
                    content="Satisfied with the work done by your freelancer?
                    Buy more of his tokens and complete the whole project with your perfect freelancer or Not satisfied? buy tokens of some other freelancer and continue the project"
                />
            </div>
            <hr></hr>
            <div className='line'>
                <h2>FOR TALENTS</h2>
                <div className="features__single">
                    <Feature
                        src="https://www.f-cdn.com/assets/main/en/assets/home/redesign/need-work-done/post-a-job-redesign.svg"
                        title="Post a job"
                        content="Post the job that you want to work for and also upload some of your works related to the respective field. The more detailed your post is, the more chances of you getting hired."
                    />
                    <Feature
                        src="https://www.f-cdn.com/assets/main/en/assets/home/redesign/need-work-done/choose-freelancers-redesign.svg"
                        title="Set hourly price"
                        content="Set the number of hours you work daily. These hours will be exposed as tokens to the clients. The clients will buy these tokens to hire you."
                    />
                    <Feature
                        src="https://www.f-cdn.com/assets/main/en/assets/home/redesign/need-work-done/pay-safely-redesign.svg"
                        title=" Customize hours"
                        content="Decide how many hours to work for each day and expose those hours as tokens to your clients. Want a break? Pause the tokens from exposing."
                    />
                </div>
            </div>
                

        </div>
    )
}

export default Features
