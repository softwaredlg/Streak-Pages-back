const verifyType = (type) => {

    const validTypes = [
        "PHRASE",
        "TIP"
    ];

    return validTypes.includes(type);
};

module.exports = {
    verifyType
};