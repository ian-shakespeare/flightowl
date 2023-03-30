export interface FlightOffer {
    id: string;
    instantTicketingRequired: boolean;
    itineraries: {
        duration: string;
        segments: {
            aircraft: { code: string };
            arrival: {
                iataCode: string;
                terminal: string;
                at: string;
            };
            blacklistedInEu: boolean;
            carrierCode: string;
            departure: {
                iataCode: string;
                terminal: string;
                at: string;
            };
            duration: string;
            id: string;
            number: string;
            numberOfStops: number;
            operating: { carrierCode: string };
        }[];
    }[];
    lastTicketingDate: string;
    nonHomogeneous: false;
    numberOfBookableSeats: number;
    oneWay: boolean;
    price: {
        base: string;
        currency: string;
        fees: {
            amount: string;
            type: string;
        }[];
        grandTotal: string;
        total: string;
    };
    pricingOptions: {
        fareType: string[];
        includedCheckedBagsOnly: boolean;
    };
    source: string;
    travelerPricings: {
        fareDetailsBySegment: {
            segmentId: string;
            cabin: string;
            fareBasis: string;
            class: string;
            brandedFare: string;
            includedCheckedBags: { quantity: number };
        }[];
        fareOption: string;
        price: {
            currency: string;
            total: string;
            base: string;
        };
        travelerId: string;
        travelerType: string;
    }[];
    type: string;
    validatingAirlineCodes: string[];
}

export interface SavedFlightOffer {
    offer_id: number;
    date_saved: string;
    offer: {
        data: FlightOffer;
    };
}

export interface Account {
    firstName: string;
    lastName: string;
    email: string;
    sex: string;
    dateJoined: string;
}

export interface Airport {
    id: string;
    name: string;
    continent: string;
    municipality: string;
    iata_code: string;
}
