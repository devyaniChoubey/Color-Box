export default  {
    root : {
        backgroundColor : "white",
        border : "1px solid black",
        borderRadius : '5px',
        padding : "0.5rem",
        position : "relative",
        overflow : "hidden",
        cursor: "pointer",
        "&:hover svg": {
          opacity: 1
        }
    },
    colors : {
        backgroundColor : "pink",
        height: "140px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
    },
    title : {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.7rem",
        paddingBottom : "1rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji : {
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-6px"
    },
    delete: {},
    deleteIcon: {
        color: "white",
        backgroundColor: "#eb3d30",
        width: "40px",
        height: "40px",
        position: "absolute",
        right: "0px",
        top: "0px",
        padding: "10px",
        zIndex: 10,
        opacity: 0
    }
}