import { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Check,
  AlertCircle,
} from "lucide-react";
import { hotelsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Hotel, HotelOffer } from "@/lib/types";

interface HotelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: Hotel;
  offer: HotelOffer;
  searchParams: {
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    rooms: number;
  };
}

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  paymentMethod: "credit_card" | "bank_transfer";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

const HotelBookingModal = ({
  isOpen,
  onClose,
  hotel,
  offer,
  searchParams,
}: HotelBookingModalProps) => {
  const [currentStep, setCurrentStep] = useState<
    "details" | "payment" | "confirmation"
  >("details");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit_card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  if (!isOpen) return null;

  const calculateNights = () => {
    const checkIn = new Date(searchParams.checkInDate);
    const checkOut = new Date(searchParams.checkOutDate);
    return Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    const basePrice = parseFloat(offer.price.total) * nights;
    const taxes = basePrice * 0.13; // 13% tax for Nepal
    return {
      basePrice,
      taxes,
      total: basePrice + taxes,
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const validateStep = (step: "details" | "payment") => {
    const newErrors: Partial<BookingFormData> = {};

    if (step === "details") {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone is required";

      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (step === "payment" && formData.paymentMethod === "credit_card") {
      if (!formData.cardNumber)
        newErrors.cardNumber = "Card number is required";
      if (!formData.expiryDate)
        newErrors.expiryDate = "Expiry date is required";
      if (!formData.cvv) newErrors.cvv = "CVV is required";
      if (!formData.cardHolderName)
        newErrors.cardHolderName = "Card holder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === "details" && validateStep("details")) {
      setCurrentStep("payment");
    } else if (currentStep === "payment" && validateStep("payment")) {
      handleBooking();
    }
  };

  const handleBooking = async () => {
    setIsLoading(true);

    try {
      // Call our backend API
      const bookingData = {
        hotel: hotel,
        offer: offer,
        searchParams: searchParams,
        guestDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests,
        },
        paymentDetails: {
          method: formData.paymentMethod,
          // Note: In production, payment details should be handled securely
        },
      };

      const response = await hotelsApi.createBooking(bookingData);

      setBookingReference(response.bookingReference);
      setBookingConfirmed(true);
      setCurrentStep("confirmation");
    } catch (error) {
      console.error("Booking failed:", error);
      // Handle error state - you could add error state management here
    } finally {
      setIsLoading(false);
    }
  };

  const pricing = calculateTotalPrice();
  const nights = calculateNights();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-nepal-purple text-white">
          <h2 className="text-2xl font-bold">
            {currentStep === "details" && "Guest Details"}
            {currentStep === "payment" && "Payment Information"}
            {currentStep === "confirmation" && "Booking Confirmed"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex max-h-[calc(90vh-80px)]">
          {/* Left Panel - Hotel & Booking Summary */}
          <div className="w-1/3 bg-gray-50 p-6 border-r overflow-y-auto">
            <div className="space-y-6">
              {/* Hotel Info */}
              <div>
                <img
                  src={
                    hotel.media?.[0]?.uri ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  }
                  alt={hotel.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-bold text-lg text-nepal-text-dark">
                  {hotel.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {hotel.address.lines.join(", ")}, {hotel.address.cityName}
                </p>
                {hotel.rating && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: hotel.rating }, (_, i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      ({hotel.rating} star)
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Booking Details */}
              <div>
                <h4 className="font-semibold text-nepal-text-dark mb-3">
                  Booking Details
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">
                      {formatDate(searchParams.checkInDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">
                      {formatDate(searchParams.checkOutDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nights:</span>
                    <span className="font-medium">{nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">
                      {searchParams.adults} adults
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rooms:</span>
                    <span className="font-medium">{searchParams.rooms}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Room Details */}
              <div>
                <h4 className="font-semibold text-nepal-text-dark mb-3">
                  Room Details
                </h4>
                <div className="text-sm">
                  <p className="font-medium">{offer.room.type}</p>
                  {offer.room.typeEstimated && (
                    <p className="text-gray-600 mt-1">
                      {offer.room.typeEstimated.beds}{" "}
                      {offer.room.typeEstimated.bedType} bed(s)
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div>
                <h4 className="font-semibold text-nepal-text-dark mb-3">
                  Price Breakdown
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Room rate × {nights} nights</span>
                    <span>
                      {offer.price.currency} {pricing.basePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & fees</span>
                    <span>
                      {offer.price.currency} {pricing.taxes.toFixed(2)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg text-nepal-orange">
                    <span>Total</span>
                    <span>
                      {offer.price.currency} {pricing.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {currentStep === "details" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-nepal-text-dark mb-4">
                    Guest Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialRequests">
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any special requests or preferences..."
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        specialRequests: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>
              </div>
            )}

            {currentStep === "payment" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-nepal-text-dark mb-4">
                    Payment Method
                  </h3>
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="credit_card"
                          checked={formData.paymentMethod === "credit_card"}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: e.target.value as "credit_card",
                            }))
                          }
                        />
                        <CreditCard className="h-4 w-4" />
                        <span>Credit Card</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="bank_transfer"
                          checked={formData.paymentMethod === "bank_transfer"}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: e.target.value as "bank_transfer",
                            }))
                          }
                        />
                        <span>Bank Transfer</span>
                      </label>
                    </div>

                    {formData.paymentMethod === "credit_card" && (
                      <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                        <div>
                          <Label htmlFor="cardHolderName">
                            Card Holder Name *
                          </Label>
                          <Input
                            id="cardHolderName"
                            value={formData.cardHolderName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                cardHolderName: e.target.value,
                              }))
                            }
                            className={
                              errors.cardHolderName ? "border-red-500" : ""
                            }
                          />
                          {errors.cardHolderName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cardHolderName}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                cardNumber: e.target.value,
                              }))
                            }
                            className={
                              errors.cardNumber ? "border-red-500" : ""
                            }
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  expiryDate: e.target.value,
                                }))
                              }
                              className={
                                errors.expiryDate ? "border-red-500" : ""
                              }
                            />
                            {errors.expiryDate && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.expiryDate}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  cvv: e.target.value,
                                }))
                              }
                              className={errors.cvv ? "border-red-500" : ""}
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.cvv}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "bank_transfer" && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Bank transfer details will be provided after booking
                          confirmation. Payment must be completed within 24
                          hours to secure your reservation.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === "confirmation" && (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-nepal-text-dark mb-2">
                    Booking Confirmed!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your hotel reservation has been successfully confirmed.
                  </p>
                  <div className="bg-nepal-light-gray p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Booking Reference</p>
                    <p className="text-xl font-bold text-nepal-purple">
                      {bookingReference}
                    </p>
                  </div>
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    A confirmation email has been sent to {formData.email} with
                    your booking details and payment instructions.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <div className="flex space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${currentStep === "details" ? "bg-nepal-purple" : "bg-gray-300"}`}
            />
            <div
              className={`w-3 h-3 rounded-full ${currentStep === "payment" ? "bg-nepal-purple" : "bg-gray-300"}`}
            />
            <div
              className={`w-3 h-3 rounded-full ${currentStep === "confirmation" ? "bg-nepal-purple" : "bg-gray-300"}`}
            />
          </div>

          <div className="flex space-x-3">
            {currentStep !== "confirmation" && (
              <>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                {currentStep === "payment" && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("details")}
                  >
                    Back
                  </Button>
                )}
                <Button
                  className="nepal-button-primary"
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Processing..."
                    : currentStep === "details"
                      ? "Continue"
                      : "Confirm Booking"}
                </Button>
              </>
            )}
            {currentStep === "confirmation" && (
              <Button className="nepal-button-primary" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingModal;
