import '../AuthBase.css';


const AuthContainer = ({content}) => {
    return(
        <div className="container-outer">
            <div className="container-middle">
                <div className="container-inner">
                    {content}
                </div>
            </div>
        </div>
    )
};


export default AuthContainer;
