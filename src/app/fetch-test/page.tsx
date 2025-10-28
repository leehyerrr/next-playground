import RouteHandler from "./route-handler/page";
import ServerAction from "./server-action/page";

function page() {
  return (
    <div>
      <div>
        <h4 className="text-3xl">route-handler</h4>
        <RouteHandler />
      </div>
      <div>
        <h4 className="text-3xl">server-action</h4>
        <ServerAction />
      </div>
    </div>
  );
}

export default page;
