type PubNubConfigurationObject = {
  publishKey: string;
  subscribeKey: string;
};

const isPubNubConfigured = (keyConfiguration: PubNubConfigurationObject) =>
  keyConfiguration.publishKey.length !== 0 &&
  keyConfiguration.subscribeKey.length !== 0;

export default isPubNubConfigured;
