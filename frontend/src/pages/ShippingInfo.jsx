import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { countries } from "countries-list";

const ShippingInfo = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const handleSubmitShippingInfo = (e) => {
    e.preventDefault();
    console.log(address, city, country, zipCode, phoneNo);
  };

  return (
    <form
      className="flex flex-col gap-10 shadow-lg p-5 max-w-xl mx-auto"
      onSubmit={handleSubmitShippingInfo}
    >
      <h2 className="text-3xl font-bold">Shipping Info</h2>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          type="text"
          id="address"
          required
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input
          type="text"
          required
          id="city"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="zipCode">zip Code</Label>
        <Input
          type="text"
          id="zipCode"
          required
          placeholder="zipCode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="phoneNo">Phone Number</Label>
        <Input
          type="text"
          required
          id="phoneNo"
          placeholder="Phone Number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Country
        </label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {Object.values(countries).map((c) => {
            return (
              <option key={c?.name} value={c?.name}>
                {c?.name}
              </option>
            );
          })}
        </select>
      </div>

      <Button className="w-[50%] mx-auto" variant="auth" type="submit">
        Checkout
      </Button>
    </form>
  );
};

export default ShippingInfo;
