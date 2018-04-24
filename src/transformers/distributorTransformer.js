module.expports = async(distributor) => {
    return {channel: distributor.channel, data: await distributor.latest()};
};