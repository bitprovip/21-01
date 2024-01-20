import requestApiMomo from "../service/requestApiMomo";

const handleRequestMoMo = async (req,res) => {
    let data = await requestApiMomo.executeApiRequest(req.body);
    return res.status(200).json({
        data: data
    });
}

module.exports = {
    handleRequestMoMo:handleRequestMoMo,
}
