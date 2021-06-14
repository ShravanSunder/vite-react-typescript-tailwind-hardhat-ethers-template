import { Typography, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const componentMessages = (error: Error) => {
   const msg = 'Uhoh! There was an error!';
   const showDetails = true; // dev flag needed //todo

   let msgDetails = error?.stack?.slice(0, 400) ?? '';
   msgDetails += '\n\r...\n\r';
   if ((error?.stack?.length ?? 0) > 600) {
      msgDetails += error?.stack?.slice(error?.stack?.length - 600, error?.stack?.length);
   }

   return { msg, showDetails, msgDetails };
};

const consoleLog = (error: any, componentStack: string | undefined) => {
   console.log('--------------------');
   console.log(error.stack);
   console.log(componentStack);
   console.log('--------------------');
};

export const ErrorFallback = ({ error }: FallbackProps): JSX.Element => {
   // TODO in future, change this so that it takes dev or production into account when rendering
   // https://github.com/bvaughn/react-error-boundary

   const { msg, showDetails, msgDetails } = componentMessages(error);
   consoleLog(error, error?.stack);

   return (
      <>
         {!showDetails && <Typography>{msg}</Typography>}
         {showDetails && (
            <Accordion>
               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="body1">
                     <IconButton color="secondary">
                        <ErrorOutlineIcon />
                     </IconButton>
                     {msg}
                  </Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <Typography variant="caption">
                     <pre css={{ fontFamily: 'inherit' }}>{msgDetails}</pre>
                  </Typography>
               </AccordionDetails>
            </Accordion>
         )}
      </>
   );
};
export { ErrorBoundary };
