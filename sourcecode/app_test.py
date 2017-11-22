import unittest
import app
class AppTest(unittest.TestCase):
    def test_root(self):
        self.app = app.app.test_client()
        out = self.app.get('/')
        assert '200 OK' in out.status # check 
        assert 'charset=utf-8' in out.content_type
        assert 'text/html' in out.content_type
        assert b'Trello API Based Dashboard' in out.data # check that page loads correctly

if __name__ == "__main__":
    unittest.main()

