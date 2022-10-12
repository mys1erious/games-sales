const AuthCaptionLink = ({
    href,
    color="#1c78d3",
    children
}) => (
    <a href={href} style={{color: color}}>
        {children}
    </a>
);


export default AuthCaptionLink;
