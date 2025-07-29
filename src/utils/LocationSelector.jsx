import React, { useEffect, useState } from "react";
import useLocationData from "../api/useLocationData";

function LocationSelector({ onLocationChange }) {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const { allDivisions, allDistricts, allUpazilas } = useLocationData();

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistric, setSelectedDistrict] = useState(null);
  const [selectedUpazila, setSElectedUpazila] = useState(null);

  //   console.log("form locationSelector", allDivisions, allDistricts, allUpazilas);

  useEffect(() => {
    setDivisions(allDivisions);
  }, [allDivisions]);

  useEffect(() => {
    if (selectedDivision) {
      const filteredDistrict = allDistricts.filter((d) => {
        return d.division_id === selectedDivision?.id;
      });
    //   console.log(filteredDistrict);
      setDistricts(filteredDistrict);
      setUpazilas([]);
      setSelectedDistrict("");
      setSElectedUpazila("");
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistric) {
      const filteredUpazila = allUpazilas.filter(
        (u) => u.district_id === selectedDistric?.id
      );
      //   console.log(filteredUpazila);
      setUpazilas(filteredUpazila);
      setSElectedUpazila("");
    }
  }, [selectedDistric]);

  useEffect(() => {
    if (selectedDivision && selectedDistric && selectedUpazila) {
      onLocationChange({
        division: selectedDivision.id,
        district: selectedDistric.id,
        upazila: selectedUpazila.id,
      });
    }
  }, [selectedDivision, selectedDistric, selectedUpazila]);

  //   console.log({
  //     div: selectedDivision,
  //     dis: selectedDistric,
  //     upaz: selectedUpazila,
  //   });
  return (
    <>
      <div className="flex gap-3 items-center">
        <select
          name="division"
          value={selectedDivision?.id || ""}
          onChange={(e) => {
            const div = divisions.find((d) => d.id === e.target.value);
            setSelectedDivision(div);
          }}
          required
          className="input cursor-pointer"
        >
          <option disabled value="">
            --Division--
          </option>
          {divisions?.map((div) => (
            <option key={div.id} value={div.id}>
              {div.name}
            </option>
          ))}
        </select>
        <select
          name="district"
          value={selectedDistric?.id || ""}
          className="input cursor-pointer"
          onChange={(e) => {
            const dist = districts.find((d) => d.id === e.target.value);
            setSelectedDistrict(dist);
          }}
          required
        >
          <option value="" disabled>
            --District--
          </option>
          {districts.map((dis) => (
            <option key={dis.name} value={dis.id}>
              {dis.name}
            </option>
          ))}
        </select>
      </div>
      <select
        name="upazila"
        value={selectedUpazila?.id || ""}
        id=""
        className="input cursor-pointer"
        onChange={(e) => {
          const upz = upazilas.find((u) => u.id === e.target.value);
          setSElectedUpazila(upz);
        }}
        required
      >
        <option value="" disabled>
          --Upazila--
        </option>
        {upazilas.map((upz) => (
          <option key={upz.name} value={upz.id}>
            {upz.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default LocationSelector;
