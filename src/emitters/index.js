module.exports = (io) => {
    return (room, event) => {
        return(data) => {
            io.to(room).emit(event, data);
        }
    }
};