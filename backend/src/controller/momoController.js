import requestApiMomo from "../service/requestApiMomo";

const handleRequestMoMo = async (req,res) => {
    let data = await requestApiMomo.executeApiRequest(req.body);
    return res.status(200).json({
        data: data
    });
}

const handleValid = async (req,res) => {
    // let data = await requestApiMomo.executeApiRequest(req.body);
    console.log('<<>>', req);
    return res.status(204).json({
        data: []
    });
}

module.exports = {
    handleRequestMoMo:handleRequestMoMo,handleValid
}
