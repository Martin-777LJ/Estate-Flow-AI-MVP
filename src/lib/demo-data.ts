export const DEMO_LEADS = [
  {
    id: 'demo-1',
    full_name: 'Marcus Alexander',
    email: 'marcus.a@example.com',
    phone: '+1 (555) 123-4567',
    property_type: 'Luxury Condo',
    interest_type: 'buy',
    location: 'Downtown Waterfront',
    budget: '$850k - $1.2M',
    status: 'qualified',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'demo-2',
    full_name: 'Sarah Jenkins',
    email: 's.jenkins@example.com',
    phone: '+1 (555) 987-6543',
    property_type: 'Family Home',
    interest_type: 'rent',
    location: 'Westside Suburbs',
    budget: '$4k - $6k /mo',
    status: 'new',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: 'demo-3',
    full_name: 'Robert Chen',
    email: 'r.chen@investments.com',
    phone: '+1 (555) 444-5555',
    property_type: 'Multi-family',
    interest_type: 'invest',
    location: 'North Beach',
    budget: '$2M+',
    status: 'contacted',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: 'demo-4',
    full_name: 'Elena Rodriguez',
    email: 'elena.rod@example.com',
    phone: '+1 (555) 222-3333',
    property_type: 'Modern Loft',
    interest_type: 'buy',
    location: 'Art District',
    budget: '$600k - $750k',
    status: 'qualified',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  }
];

export const DEMO_CONVERSATIONS = [
  {
    id: 'conv-1',
    visitor_id: 'visitor-1',
    last_message: 'I would like to schedule a viewing for this Saturday.',
    lead_captured: true,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    lead: { full_name: 'Marcus Alexander' }
  },
  {
    id: 'conv-2',
    visitor_id: 'visitor-2',
    last_message: 'What is the minimum lease term for the North Beach apartments?',
    lead_captured: false,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    lead: null
  }
];

export const DEMO_STATS = {
  leads: 124,
  chats: 856,
  qualified: 42,
  conversions: '34%'
};
