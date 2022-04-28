export default(req, res) => {
    res.statusCode = 200;
    res.send({message: "helloWorld"});
};
// http://localhost:3001/api/helloWorld