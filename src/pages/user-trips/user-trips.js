import { CircularProgress, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../axios config/axiosInstance";
import TripCart from "../../components/trips/trip-card";




const UserTrips = () => {
    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [buttonsRadio, setButtonRadio] = useState(0);
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const token = localStorage.getItem("token");
    console.log("user", user._id);
    console.log("token", token);
    let config = {
        headers: {
            "Authorization": token,
        },
    };
    useEffect(() => {
        axiosInstance.get(`/reservations?lang=${i18n.language}`, config).then((res) => {
            console.log(res.data);
            // reservation-successful

        })
            .catch((err) => {
                console.log(err);
                console.log("user", user._id);
                console.log("token", token);
            });
        console.log("user", user._id);
        console.log("token", token);

    }, [user]);


    const handleSearch = () => {
        history.push(`/`)
    }
    const handleRadio = (btnNum) => {
        setButtonRadio(btnNum)
    }

    return <>
        {isLoading ? (
            <div className="container p-5 m-5 d-flex justify-content-center">
                <CircularProgress style={{ color: "#ff5b60" }} />
            </div>
        ) : (
            <div
                className="container pt-3"
                dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}
            >
                {/* ---------- component header ---------- */}
                <h2 className="my-3 fw-bold">{t("Trips")}</h2>
                <Divider style={{ background: "#757575" }} className="my-3" />
                <div className="my-4">
                    <h4 className="">{t("No trips booked...yet!")}</h4>
                    <p className="text-secondary">{t("Time to dust off your bags and start planning your next adventure")}</p>
                    <button type="button" class="btn btn-outline-dark px-4 py-3 my-2" onClick={handleSearch}>{t("Start searching")}</button>
                </div>
                <div className="my-4">
                    <div className="btn-group mb-4" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onClick={() => { handleRadio(0) }} checked={buttonsRadio === 0} disabled={buttonsRadio === 0} />
                        <label className="btn btn-outline-dark" for="btnradio1">All Trips</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onClick={() => { handleRadio(1) }} checked={buttonsRadio === 1} disabled={buttonsRadio === 1} />
                        <label className="btn btn-outline-dark" for="btnradio2">Past Trips</label>

                        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" onClick={() => { handleRadio(2) }} checked={buttonsRadio === 2} disabled={buttonsRadio === 2} />
                        <label className="btn btn-outline-dark" for="btnradio3">Present Trips</label>

                        <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" onClick={() => { handleRadio(3) }} checked={buttonsRadio === 3} disabled={buttonsRadio === 3} />
                        <label className="btn btn-outline-dark" for="btnradio4">upcomming Trips</label>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        <div className="p-3"><div className="col-12 p-3 rounded-3" style={{ border: "1px solid #6f7174" }}><TripCart /></div></div>
                        <div className="p-3"><div className="col-12 p-3 rounded-3" style={{ border: "1px solid #6f7174" }}><TripCart /></div></div>
                        <div className="p-3"><div className="col-12 p-3 rounded-3" style={{ border: "1px solid #6f7174" }}><TripCart /></div></div>
                        <div className="p-3"><div className="col-12 p-3 rounded-3" style={{ border: "1px solid #6f7174" }}><TripCart /></div></div>
                        <div className="p-3"><div className="col-12 p-3 rounded-3" style={{ border: "1px solid #6f7174" }}><TripCart /></div></div>



                    </div>
                </div>
                <Divider style={{ background: "#757575" }} className="my-3" />
                <p style={{ fontSize: "14px" }} className="my-3">
                    {t("Can’t find your reservation here?")}{" "}
                    <a href="/" className="text-dark fw-bold">
                        {t("Visit the Help Center")}
                    </a>{" "}</p>

            </div>
        )}   </>;
}

export default UserTrips;