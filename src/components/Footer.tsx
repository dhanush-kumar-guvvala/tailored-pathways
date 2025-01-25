import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
            <p className="mb-6 text-gray-300">
              Join now and begin your journey towards academic and career success
            </p>
            <Button 
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Join Now
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Home</li>
                <li>Features</li>
                <li>How It Works</li>
                <li>Benefits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Support</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AI Student Mentoring. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};