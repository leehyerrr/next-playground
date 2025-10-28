import RouteHandler from "./route-handler/page";
import ServerAction from "./server-action/page";

function page() {
  return (
    <div>
      <div>
        <h4>route-handler</h4>
        <RouteHandler />
      </div>
      <div>
        <h4>server-action</h4>
        <ServerAction />
      </div>
    </div>
  );
}

export default page;
