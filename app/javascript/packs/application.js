import "../stylesheets/application.scss";

import { setAuthHeaders } from "src/apis/axios";
import { initializeLogger } from "src/common/logger";

initializeLogger();
setAuthHeaders();
