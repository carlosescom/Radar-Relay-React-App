/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.HomePage';

export default defineMessages({
  startProjectHeader: {
    id: `${scope}.start_project.header`,
    defaultMessage: `Source liquidity from Radar Relay using its SDK`,
  },
  startProjectMessage: {
    id: `${scope}.start_project.message`,
    defaultMessage: `UX works similarly to Fulcrum`,
  },
  tradeHeader: {
    id: `${scope}.trade.header`,
    defaultMessage: 'Trade',
  },
  tradeMessage: {
    id: `${scope}.trade.message`,
    defaultMessage: 'Market: ',
  },
  tradeSeparator: {
    id: `${scope}.trade.Separator`,
    defaultMessage: '/',
  },
});
