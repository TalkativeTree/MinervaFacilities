import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// const geocodeByAddress = (address: string): Promise<google.maps.GeocoderResult[]>;

// geocodeByAddress('Montevideo, Uruguay')
//   .then(results => console.log(results))
//   .catch(error => console.error(error));

class AddressForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {result: ""};
    };

  sendBackData = () => {
    var address = this.state.result.value;
    console.log(address)
    this.props.parentCallBack(address);
  };

  render() {
    return (
      <div>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyDJ1foA09dKFjq-_KfWg2K822qClFUDaAc"
          onLoadFailed={(error) =>
            console.error('Could not inject Google script', error)
          }
          selectProps={{
            value: this.state.result,
            onChange: this.state.result,
            // onChange: (object | object[] | null | undefined, action) => setValue,
            placeholder: 'Enter A Location...',
            styles: {
              input: (provided) => ({
                ...provided,
                color: 'blue',
              }),
              option: (provided) => ({
                ...provided,
                color: 'blue',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: 'blue',
              }),
            },
          }}
        />
        <button onClick={this.sendBackData}>click me to send back</button>;
      </div>
    );
  }
}

export default AddressForm;
