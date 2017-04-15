# API settings
API_URL = 'https://api.twitter.com/1.1/statuses/home_timeline.json'
API_STREAMING = 'https://stream.twitter.com/1.1/statuses/filter.json?'

CONSUMER_KEY = ''
CONSUMER_SECRET = ''
ACCESS_TOKEN = ''
ACCESS_TOKEN_SECRET = ''


# Time in seconds to sleep between requests
FEEDBACK_API_SLEEP = 0.75 # stays within 1000/15 min rate limit
WEBHOOK_SLEEP = 0.25

# Max number of events recevied from each feedback API request
EVENTS_PAGE_COUNT = 100;

# Epoch timestamp in milliseconds
START_TIME = 1451635200000
END_TIME = 1461193685380

# Track object
TRACK = "openstack,ubuntu,linux,python,openshift,aws,ovh"
params = {'track':TRACK}
#params = {'locations':'-74,40,-73,41','track':TRACK}

