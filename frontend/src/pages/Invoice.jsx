import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGetSingleOrderQuery } from "@/store/api/orderApi";
import Metadata from "@/components/layout/Metadata";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import NotFound from "@/components/layout/NotFound";
import Loading from "@/components/layout/Loading";

const Invoice = () => {
  const { orderId } = useParams();
  const { data, isLoading, error, isError } = useGetSingleOrderQuery(orderId);
  const isPaid = data?.order?.paymentInfo?.status === "paid";

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const handleDownload = () => {
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`invoice_${data?.order?._id}.pdf`);
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error?.status === 404) {
    return <NotFound />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Metadata title={"Order Invoice"} />
      <div className="order-invoice my-5">
        <div className="flex flex-col items-center justify-center mb-5">
          <Button onClick={handleDownload} disabled={!isPaid}>
            Download Invoice
          </Button>
          {!isPaid && (
            <p className="text-red-500 font-semibold text-lg">
              the order must be paid to download the invoice
            </p>
          )}
        </div>
        <div id="order_invoice" className="p-3 shadow-lg">
          <header>
            <div className="flex justify-center items-center">
              <img
                src="/images/invoice-logo.png"
                alt="Company Logo"
                className="w-44 h-48"
              />
            </div>
            <h1 className="text-3xl mb-4 text-center font-bold">
              INVOICE # {data?.order?._id}
            </h1>
            <div className="flex justify-between">
              <div id="company">
                <div>ShopIT</div>
                <div>
                  15 Taqseem Assiut,
                  <br />
                  AZ 854, Egypt
                </div>
                <div>(+2) 01007176747</div>
                <div>
                  <a href="mailto:moutaz.ali.dev@gamil.com">
                    info@mezo-shopping
                  </a>
                </div>
              </div>
              <div id="project">
                <div>
                  <span>Name : </span> {data?.order?.user?.name}
                </div>
                <div>
                  <span>EMAIL : </span> {data?.order?.user?.email}
                </div>
                <div>
                  <span>PHONE : </span> {data?.order?.shippingInfo?.phoneNo}
                </div>
                <div>
                  <span>ADDRESS : </span>
                  {data?.order?.shippingInfo?.address},{" "}
                  {data?.order?.shippingInfo?.city},{" "}
                  {data?.order?.shippingInfo?.zipCode},{" "}
                  {data?.order?.shippingInfo?.country}
                </div>
                <div>
                  <span>DATE</span>{" "}
                  {new Date(data?.order?.createdAt).toLocaleString("en-US")}
                </div>
                <div>
                  <span>Status : </span>{" "}
                  <span
                    className={`${
                      isPaid
                        ? "text-green-500 font-semibold"
                        : "text-red-500 font-semibold"
                    }`}
                  >
                    {data?.order?.paymentInfo?.status}
                  </span>
                </div>
              </div>
            </div>
          </header>
          <main>
            <table className="mt-5 w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {data?.order?.orderItems?.map((item) => (
                  <tr key={item?._id}>
                    <td className="text-center text-sm font-bold">
                      {item?.product}
                    </td>
                    <td className="text-center">{item?.name}</td>
                    <td className="text-center">${item?.price}</td>
                    <td className="text-center">{item?.quantity}</td>
                    <td className="text-center">
                      ${item?.price * item?.quantity}
                    </td>
                  </tr>
                ))}

                <tr className="my-4">
                  <td colSpan="4">
                    <b>SUBTOTAL</b>
                  </td>
                  <td className="total">${data?.order?.itemsPrice}</td>
                </tr>

                <tr className="my-4">
                  <td colSpan="4">
                    <b>TAX 14% VAT</b>
                  </td>
                  <td className="total">${data?.order?.taxAmount}</td>
                </tr>

                <tr className="my-4">
                  <td colSpan="4">
                    <b>SHIPPING</b>
                  </td>
                  <td className="total">${data?.order?.shippingAmount}</td>
                </tr>

                <tr className="my-4">
                  <td colSpan="4">
                    <b>GRAND TOTAL</b>
                  </td>
                  <td className="grand total">${data?.order?.totalAmount}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="text-xl font-semibold">NOTICE:</div>
              <div className="notice">
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </div>
            </div>
          </main>
          <footer className="my-5 font-bold text-lg text-center">
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
